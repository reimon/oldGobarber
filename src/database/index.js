import Sequelize from 'sequelize';
import File from '../app/models/File';
import User from '../app/models/Users';
import Appointment from '../app/models/Appointments';
import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connnection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connnection))
      .map(
        model => model.associate && model.associate(this.connnection.models)
      );
  }
}
export default new Database();
