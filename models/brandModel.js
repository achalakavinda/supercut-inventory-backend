const Sequelize = require('sequelize');
const sequelize = require('../sequelizeserver');
const bcrypt = require('bcryptjs')

const Company = require('./companyModel');
const CompanyDivision = require('./companyDivisionModel');

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
            allowNull:true,
            references: {
                model: Brand,
                key: 'id'
            }
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
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
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

module.exports = Brand;