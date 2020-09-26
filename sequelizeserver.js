const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const sequelize = new Sequelize(process.env.DB_database, process.env.DB_username, process.env.DB_password, {
    host: process.env.DB_host,
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync();

module.exports = sequelize;