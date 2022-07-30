"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_init = void 0;
const bcryptjs_1 = require("bcryptjs");
const col = require("cli-color");
const _1 = require(".");
const Module_1 = require("./models/Module");
const Permission_1 = require("./models/Permission");
const ServerData_1 = require("./models/ServerData");
const User_1 = require("./models/User");
const UserHasPermission_1 = require("./models/UserHasPermission");
async function db_init() {
    const q = _1.db_conn.getQueryInterface();
    const schemas = await q.showAllSchemas();
    if (schemas.includes(process.env.DB_SCHEMA)) {
        process.stdout.moveCursor(0, -1);
        console.log(col.green(' deploying database...! '));
        return;
    }
    await q.createSchema(process.env.DB_SCHEMA);
    await ServerData_1.ServerData.sync({ force: true });
    await User_1.User.sync({ force: true });
    await Module_1.Module.sync({ force: true });
    await Permission_1.Permission.sync({ force: true });
    await UserHasPermission_1.UserHasPermission.sync({ force: true });
    const root_user = await User_1.User.create({
        fullname: 'Administrator',
        username: 'admin',
        password: bcryptjs_1.hashSync('admin', bcryptjs_1.genSaltSync()),
        can_login: true,
    });
    const modules = await Module_1.Module.bulkCreate([{ name: 'dashboard' }, { name: 'users' }], {
        returning: true,
    });
    const permissions = await Permission_1.Permission.bulkCreate([
        {
            name: 'view-dashboard',
            description: 'view dashboard',
            module_id: modules.find((m) => m.name == 'dashboard').id,
        },
        {
            name: 'view-users',
            description: 'view the list of application user accounts and information',
            module_id: modules.find((m) => m.name == 'users').id,
        },
        {
            name: 'manage-users',
            description: 'create, modify, or delete user accounts in the application',
            module_id: modules.find((m) => m.name == 'users').id,
        },
        {
            name: 'view-permissions',
            description: 'view the list of application permissions',
            module_id: modules.find((m) => m.name == 'users').id,
        },
        {
            name: 'manage-user-permissions',
            description: 'grant or revoke permissions on user accounts',
            module_id: modules.find((m) => m.name == 'users').id,
        },
    ], { returning: true });
    await UserHasPermission_1.UserHasPermission.bulkCreate(permissions.map((p) => {
        return { user_id: root_user.id, permission_id: p.id };
    }));
}
exports.db_init = db_init;
