module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, // uma coluna que irão armazenar data de criação e alteração
    underscored: true,
    underscoredAll: true,
  },
};
