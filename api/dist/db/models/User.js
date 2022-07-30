"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../db");
const UserHasPermission_1 = require("./UserHasPermission");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    fullname: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    can_login: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_logged_in: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    last_activity: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date(),
    },
}, {
    sequelize: db_1.db_conn,
    schema: process.env.DB_SCHEMA,
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
User.hasMany(UserHasPermission_1.UserHasPermission, { sourceKey: 'id', foreignKey: 'user_id', as: 'user_permissions' });
