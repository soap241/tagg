import { Association, DataTypes, Model, Optional } from 'sequelize';

import { db_conn } from '../../db';
import { Permission } from './Permission';

interface ModuleAttributes {
	id: number;
	name: string;
}

interface ModuleCreationAttributes extends Optional<ModuleAttributes, 'id'> {}

export class Module
	extends Model<ModuleAttributes, ModuleCreationAttributes>
	implements ModuleAttributes
{
	public id!: number;
	public name!: string;

	public static associations: {
		permissions: Association<Module, Permission>;
	};
}

Module.init(
	{
		id: {
			type: DataTypes.SMALLINT,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize: db_conn,
		schema: process.env.DB_SCHEMA,
		tableName: 'modules',
		timestamps: false,
	}
);

Module.hasMany(Permission, { sourceKey: 'id', foreignKey: 'module_id', as: 'permissions' });
Permission.belongsTo(Module, { targetKey: 'id', foreignKey: 'module_id', as: 'module' });
