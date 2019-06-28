module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: Sequelize.INTERGER,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users');
  },
};
