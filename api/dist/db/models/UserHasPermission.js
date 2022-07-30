"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHasPermission = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../db");
const Permission_1 = require("./Permission");
class UserHasPermission extends sequelize_1.Model {
}
exports.UserHasPermission = UserHasPermission;
UserHasPermission.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    permission_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: 'permissions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
}, {
    sequelize: db_1.db_conn,
    schema: process.env.DB_SCHEMA,
    tableName: 'user_has_permissions',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
UserHasPermission.belongsTo(Permission_1.Permission, {
    targetKey: 'id',
    foreignKey: 'permission_id',
    as: 'permission',
});
