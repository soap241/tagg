import { Association, DataTypes, Model, Optional } from 'sequelize';

import { db_conn } from '../../db';
import { UserHasPermission } from './UserHasPermission';

interface UserAttributes {
	id: number;
	username: string;
	fullname: string;
	password: string;
	can_login: boolean;
	is_logged_in: boolean;
	last_activity: Date;
}

interface UserCreationAttributes {
	username: string;
	fullname: string;
	password: string;
	can_login?: boolean;
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
	public id!: number;
	public username!: string;
	public fullname!: string;
	public password!: string;
	public can_login!: boolean;
	public is_logged_in!: boolean;
	public last_activity!: Date;

	public user_permissions!: UserHasPermission[];

	public readonly created_at!: Date;
	public readonly updated_at!: Date;

	public static associations: {
		user_permissions: Association<User, UserHasPermission>;
	};
}

User.init(
	{
		id: {
			type: DataTypes.SMALLINT,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: new DataTypes.STRING(128),
			allowNull: false,
			unique: true,
		},
		fullname: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		password: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		can_login: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		is_logged_in: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		last_activity: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: new Date(),
		},
	},
	{
		sequelize: db_conn,
		schema: process.env.DB_SCHEMA,
		tableName: 'users',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
);

User.hasMany(UserHasPermission, { sourceKey: 'id', foreignKey: 'user_id', as: 'user_permissions' });
