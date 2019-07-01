import Sequelize from 'sequelize';

import User from '../app/models/Users';
import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connnection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connnection));
  }
}
export default new Database();
