require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, // uma coluna que irão armazenar data de criação e alteração
    underscored: true,
    underscoredAll: true,
  },
};
