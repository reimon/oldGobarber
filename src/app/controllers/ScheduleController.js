import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointments';
import User from '../models/Users';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    // 2019-06-22 00:00:00
    // 2019-06-22 23:59:59
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });
    return res.json(appointment);
  }
}

export default new ScheduleController();
