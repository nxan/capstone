const Sequelize = require('sequelize');

const db = new Sequelize('shopify', 'nxan', 'Nguyenxuanan1811', {
    dialect: 'mssql',
    host: 'nxan-azure.database.windows.net',
    port: 1433,
    timestamps: false,
    dialectOptions: { options: { encrypt: true } }
});

module.exports = db;