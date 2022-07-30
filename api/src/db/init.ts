import { hashSync, genSaltSync } from 'bcryptjs';
import * as col from 'cli-color';

import { db_conn } from '.';
import { Module } from './models/Module';
import { Permission } from './models/Permission';
import { ServerData } from './models/ServerData';
import { User } from './models/User';
import { UserHasPermission } from './models/UserHasPermission';

export async function db_init() {
	// get query interface
	const q = db_conn.getQueryInterface();

	// drop schema !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// await q.dropSchema(process.env.DB_SCHEMA);

	// check if schema exists, and if it does, bounce
	const schemas = <string[]>await q.showAllSchemas();
	if (schemas.includes(process.env.DB_SCHEMA)) {
		process.stdout.moveCursor(0, -1);
		console.log(col.green(' deploying database...! '));
		return;
	}

	// create schema
	await q.createSchema(process.env.DB_SCHEMA);

	// create tables
	await ServerData.sync({ force: true });
	await User.sync({ force: true });
	await Module.sync({ force: true });
	await Permission.sync({ force: true });
	await UserHasPermission.sync({ force: true });

	// create admin user with password 'admin'
	const root_user = await User.create({
		fullname: 'Administrator',
		username: 'admin',
		password: hashSync('admin', genSaltSync()),
		can_login: true,
	});

	// create modules
	const modules = await Module.bulkCreate([{ name: 'dashboard' }, { name: 'users' }], {
		returning: true,
	});

	// create permissions
	const permissions = await Permission.bulkCreate(
		[
			{
				name: 'view-dashboard',
				description: 'view dashboard',
				module_id: modules.find((m) => m.name == 'dashboard').id,
			},
			{
				// ===================================================================
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
		],
		{ returning: true }
	);

	// create permissions for root user
	await UserHasPermission.bulkCreate(
		permissions.map((p) => {
			return { user_id: root_user.id, permission_id: p.id };
		})
	);
}
