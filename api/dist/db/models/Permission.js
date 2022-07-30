"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../db");
class Permission extends sequelize_1.Model {
}
exports.Permission = Permission;
Permission.init({
    id: {
        type: sequelize_1.DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    module_id: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
        references: { model: 'modules', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
}, {
    sequelize: db_1.db_conn,
    schema: process.env.DB_SCHEMA,
    tableName: 'permissions',
    timestamps: false,
});
