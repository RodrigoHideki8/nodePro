const { Sequelize } = require('sequelize');
const database = require('./database');

class Database {
    constructor() {
        this.sequelize = new Sequelize(database);
    }

    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Conexão com o banco de dados estabelecida com sucesso.');
        } catch (error) {
            console.error('Erro ao conectar-se ao banco de dados:', error);
        }
    }
}

module.exports = new Database().sequelize;