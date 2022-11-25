import { Association, DataTypes, Model, Optional } from 'sequelize';

import { db_conn } from '../../db';
import { UserHasPermission } from './UserHasPermission';
import { Customer  } from './Customer';

interface UserAttributes {
	id: number;
	customer_id: number;
	username: string;
	fullname: string;
	email: string;
	password: string;
	can_login: boolean;
	is_logged_in: boolean;
	last_activity: Date;
}

interface UserCreationAttributes {
	username: string;
	fullname: string;
	email: string;
	password: string;
	can_login?: boolean;
	customer_id: number;
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
	
	public id!: number;
	public username!: string;
	public fullname!: string;
	public email: string;
	public password!: string;
	public can_login!: boolean;
	public is_logged_in!: boolean;
	public last_activity!: Date;
	public customer_id: number;

	public user_permissions!: UserHasPermission[];

	public readonly created_at!: Date;
	public readonly updated_at!: Date;

	public static associations: {
		user_permissions: Association<User, UserHasPermission>;
		company: Association<User, Customer>;

	};
}

User.init(
	{
		id: {
			type: DataTypes.SMALLINT,
			autoIncrement: true,
			primaryKey: true,
		},
		customer_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		
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
		email: {
			type: new DataTypes.STRING(128),
			allowNull: false,
			unique: true,
			
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
// User.belongsTo(Customer);