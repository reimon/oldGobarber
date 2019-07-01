import * as Yup from 'yup';
import User from '../models/Users';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: ' E-mail already exists' });
    }
    const { id, name, email, provider, password_hash } = await User.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      provider,
      password_hash,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),

      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // pega os valores no body da requisição do usuário
    const { email, oldPassword } = req.body;

    // busca no banco de dados os dados do usuario que foi autenticado
    // criar uma constante com o nome 'user' contendo todos os dados do usuario
    // (findByPk) filtrado atraves do id (req.userId) retirado do token
    // que esta no 'middlewares/auth.js'
    const user = await User.findByPk(req.userId);

    // verificar se o email já existe no BD
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: ' E-mail already exists' });
      }
    }
    // so '&&' vai verificar se a senha bate se a senha antiga foi informada
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // se tudo ta ok ele atualiza o banco de dados
    const { id, name, provider } = await user.update(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
