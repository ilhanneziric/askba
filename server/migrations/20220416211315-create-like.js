'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      questionId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Questions',
          key: 'id',
          as: 'questionId'
        }
      },
      answerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Answers',
          key: 'id',
          as: 'answerId'
        }
      },
      isDislike: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.removeColumn(
      'Questions',
      'likes'
    );
    await queryInterface.removeColumn(
      'Questions',
      'dislikes'
    );
    await queryInterface.removeColumn(
      'Answers',
      'likes'
    );
    await queryInterface.removeColumn(
      'Answers',
      'dislikes'
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
    await queryInterface.addColumn(
      'Questions',
      'likes'
    );
    await queryInterface.addColumn(
      'Questions',
      'dislikes'
    );
    await queryInterface.addColumn(
      'Answers',
      'likes'
    );
    await queryInterface.addColumn(
      'Answers',
      'dislikes'
    );
  }
};