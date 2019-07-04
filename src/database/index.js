import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import File from '../app/models/File';
import User from '../app/models/Users';
import Appointment from '../app/models/Appointments';
import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connnection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connnection))
      .map(
        model => model.associate && model.associate(this.connnection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}
export default new Database();
