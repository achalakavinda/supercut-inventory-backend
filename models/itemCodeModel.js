const Sequelize = require('sequelize');
const sequelize = require('../sequelizeserver');
const bcrypt = require('bcryptjs')

const Company = require('./companyModel');
const CompanyDivision = require('./companyDivisionModel');
const Brand = require('./brandModel');
const ItemCodeBatch = require('./itemCodeBatchModel');

const Model = Sequelize.Model;

class ItemCode extends Model{}

ItemCode.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: Brand,
                key: 'id'
            }
        },
        item_code_batch_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: ItemCodeBatch,
                key: 'id'
            }
        },
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
            allowNull:true
        },
        thumbnail_url: {
            type: Sequelize.STRING,
            allowNull:true
        },

        unit_cost: {
            type: Sequelize.FLOAT,
            allowNull:true
        },
        selling_price: {
            type: Sequelize.FLOAT,
            allowNull:true
        },

        nbt_tax_percentage: {
            type: Sequelize.FLOAT,
            defaultValue:0
        },
        vat_tax_percentage: {
            type: Sequelize.FLOAT,
            defaultValue:0
        },
        unit_price_with_tax: {
            type: Sequelize.FLOAT,
            defaultValue:0
        },

        market_price: {
            type: Sequelize.FLOAT,
            allowNull:true
        },
        min_price: {
            type: Sequelize.FLOAT,
            allowNull:true
        },
        max_price: {
            type: Sequelize.FLOAT,
            allowNull:true
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

module.exports = ItemCode;