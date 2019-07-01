import User from '../models/Users';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    // exibi todo a tabela users --> User.findAll({});
    const provider = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(provider);
  }
}
export default new ProviderController();
