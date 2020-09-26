const Sequelize = require('sequelize');
const sequelize = require('../sequelizeserver');
const bcrypt = require('bcryptjs')

const Company = require('./companyModel');
const CompanyDivision = require('./companyDivisionModel');

const Model = Sequelize.Model;

class ItemCodeBatch extends Model{}

ItemCodeBatch.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parent_id: {
            type: Sequelize.INTEGER,
            allowNull:true,
            references: {
                model: ItemCodeBatch,
                key: 'id'
            }
        },
        level: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        code: {
            type: Sequelize.STRING,
            unique: true
        },
        description: {
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

module.exports = ItemCodeBatch;