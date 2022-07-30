"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerData = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../db");
class ServerData extends sequelize_1.Model {
}
exports.ServerData = ServerData;
ServerData.init({
    key: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
    },
    data: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
}, {
    sequelize: db_1.db_conn,
    schema: process.env.DB_SCHEMA,
    tableName: 'server_data',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
