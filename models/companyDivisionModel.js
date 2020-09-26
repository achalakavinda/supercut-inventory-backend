const Sequelize = require('sequelize');
const sequelize = require('../sequelizeserver');
const bcrypt = require('bcryptjs')

const Model = Sequelize.Model;

class ComapnyDivision extends Model{}

ComapnyDivision.init({

    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    code:{
        type:Sequelize.STRING,
        unique:true
    }

},
{
    sequelize,
    timestamps: true,
  })

module.exports = ComapnyDivision;