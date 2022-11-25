import { Association, DataTypes, Model, Optional } from 'sequelize';

import { db_conn } from '../../db';
import { Module } from './Module';

interface PermissionAttributes {
	id: number;
	name: string;
	description: string;
	module_id: number;
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, 'id'> {}

export class Permission
	extends Model<PermissionAttributes, PermissionCreationAttributes>
	implements PermissionAttributes
{
	public id!: number;
	public name!: string;
	public description!: string;
	public module_id!: number;

	public static associations: {
		module: Association<Permission, Module>;
	};
}

Permission.init(
	{
		id: {
			type: DataTypes.SMALLINT,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		module_id: {
			type: DataTypes.SMALLINT,
			allowNull: false,
			references: { model: 'modules', key: 'id' },
			onUpdate: 'CASCADE',
			onDelete: 'RESTRICT',
		},
	},
	{
		sequelize: db_conn,
		schema: process.env.DB_SCHEMA,
		tableName: 'permissions',
		timestamps: false,
	}
);
