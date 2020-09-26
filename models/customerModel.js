const Sequelize = require('sequelize');
const sequelize = require('../sequelizeserver');
const bcrypt = require('bcryptjs')

const Company = require('./companyModel');
const CompanyDivision = require('./companyDivisionModel');

const Model = Sequelize.Model;

class Customer extends Model{}

Customer.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        company_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: Company,
                key: 'id'
            }
        },
        company_division_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: CompanyDivision,
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: true,
    });

module.exports = Customer;