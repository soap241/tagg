import { hashSync, genSaltSync } from 'bcryptjs';
import * as col from 'cli-color';

import { db_conn } from '.';
import { Customer } from './models/Customer';
import { Module } from './models/Module';
import { Permission } from './models/Permission';
import { ServerData } from './models/ServerData';
import { User } from './models/User';
import { UserHasPermission } from './models/UserHasPermission';

export async function db_init() {
	// get query interface
	const q = db_conn.getQueryInterface();

	// drop schema !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	 await q.dropSchema(process.env.DB_SCHEMA);

	// check if schema exists, and if it does, bounce
	const schemas = <string[]>await q.showAllSchemas();
	if (schemas.includes(process.env.DB_SCHEMA)) {
		process.stdout.moveCursor(0, -1);
		// console.log(col.green(' deploying database...! '));
		return;
	}

	// create schema
	await q.createSchema(process.env.DB_SCHEMA);

	// create tables
	await Customer.sync({ force: true });
	await ServerData.sync({ force: true });
	await User.sync({ force: true });
	await Module.sync({ force: true });
	await Permission.sync({ force: true });
	await UserHasPermission.sync({ force: true });


	// create main customer account
	const customer = await Customer.create({
		company_name: 'The automation ghana group',
		web_address: 'www.automationghana.com',
		email_address: 'enquiries@automationghana.com',
		phone: '0233700891',
		alt_phone: '0550055511',
		fax_number: '',
		address: 'GT-366-3796',
        netsuite_customer_id: 'TAGG001',

	})

	// create admin user with password 'admin'
	const root_user = await User.create({
		fullname: 'Administrator',
		username: 'admin',
		password: hashSync('admin', genSaltSync()),
		email: 'automationghana@gmail.com',
		can_login: true,
		customer_id: customer.id
	});

	// create modules
	const modules = await Module.bulkCreate([{ name: 'dashboard' }, { name: 'users' } , {name: 'customers'}], {
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
				name: 'view-customers',
				description: 'view customers',
				module_id: modules.find((m) => m.name == 'customers').id,
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
