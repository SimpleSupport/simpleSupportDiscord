const config = require('../config')
const { Sequelize } = require('sequelize');
module.exports = new Sequelize(`mysql://${config.databaseCredentials.user}:${config.databaseCredentials.pass}@${config.databaseCredentials.host}/${config.databaseCredentials.database}`);