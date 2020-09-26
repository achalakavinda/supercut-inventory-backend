const Sequelize = require('sequelize');
const sequelize = require('../sequelizeserver');
const bcrypt = require('bcryptjs')

const Model = Sequelize.Model;

class Brand extends Model{}

Brand.init({
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    parent_id: { 
        type: Sequelize.INTEGER, 
        allowNull: true
    },
    level: { 
        type: Sequelize.INTEGER, 
        defaultValue: 0
    },
    name: { 
        type: Sequelize.STRING, 
        unique: true
    },
    description: { 
        type: Sequelize.TEXT, 
        allowNull: true
    },
    img_url: { 
        type: Sequelize.TEXT, 
        allowNull: true
    },
    company_id: { 
        type: Sequelize.INTEGER, 
        allowNull: true
    },
    company_division_id: { 
        type: Sequelize.INTEGER, 
        allowNull: true
    },
    active: { 
        type: Sequelize.BOOLEAN, 
        defaultValue: false
    },

},
{
    sequelize,
    timestamps: true,
  });

module.exports = Brand;