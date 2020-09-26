const Sequelize = require('sequelize');
const sequelize = require('../sequelizeserver');
const bcrypt = require('bcryptjs')

const Model = Sequelize.Model;

class Company extends Model{}

Company.init({

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    code:{
        type:Sequelize.STRING,
        unique:true
    }

},
{
    sequelize,
    timestamps: true,
  });

  module.exports = Company;