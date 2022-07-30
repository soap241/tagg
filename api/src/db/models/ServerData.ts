import { DataTypes, Model, Optional } from 'sequelize';

import { db_conn } from '../../db';

interface ServerDataAttributes {
	key: string;
	data: object;
}

interface ServerDataCreationAttributes extends Optional<ServerDataAttributes, 'key'> {}

export class ServerData
	extends Model<ServerDataAttributes, ServerDataCreationAttributes>
	implements ServerDataAttributes
{
	public key!: string;
	public data!: object;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

ServerData.init(
	{
		key: {
			type: DataTypes.STRING(50),
			primaryKey: true,
		},
		data: {
			type: DataTypes.JSON,
			allowNull: true,
		},
	},
	{
		sequelize: db_conn,
		schema: process.env.DB_SCHEMA,
		tableName: 'server_data',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
);
