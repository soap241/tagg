"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../db");
const Permission_1 = require("./Permission");
class Module extends sequelize_1.Model {
}
exports.Module = Module;
Module.init({
    id: {
        type: sequelize_1.DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db_1.db_conn,
    schema: process.env.DB_SCHEMA,
    tableName: 'modules',
    timestamps: false,
});
Module.hasMany(Permission_1.Permission, { sourceKey: 'id', foreignKey: 'module_id', as: 'permissions' });
Permission_1.Permission.belongsTo(Module, { targetKey: 'id', foreignKey: 'module_id', as: 'module' });
