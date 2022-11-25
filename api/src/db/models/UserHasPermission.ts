import { Association, DataTypes, Model, Optional } from 'sequelize';

import { db_conn } from '../../db';
import { Permission } from './Permission';

interface UserHasPermissionAttributes {
	user_id: number;
	permission_id: number;
}

interface UserHasPermissionCreationAttributes
	extends Optional<UserHasPermissionAttributes, 'user_id'> {}

export class UserHasPermission
	extends Model<UserHasPermissionAttributes, UserHasPermissionCreationAttributes>
	implements UserHasPermissionAttributes
{
	public user_id!: number;
	public permission_id!: number;

	public readonly created_at!: Date;
	public readonly updated_at!: Date;

	public static associations: {
		permission: Association<UserHasPermission, Permission>;
	};
}

UserHasPermission.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: { model: 'users', key: 'id' },
			onUpdate: 'CASCADE',
			onDelete: 'RESTRICT',
		},
		permission_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: { model: 'permissions', key: 'id' },
			onUpdate: 'CASCADE',
			onDelete: 'RESTRICT',
		},
	},
	{
		sequelize: db_conn,
		schema: process.env.DB_SCHEMA,
		tableName: 'user_has_permissions',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
);

UserHasPermission.belongsTo(Permission, {
	targetKey: 'id',
	foreignKey: 'permission_id',
	as: 'permission',
});
