import { Association, DataTypes, Model, Optional } from 'sequelize';

import { db_conn } from '../../db';
import { User } from './User';

interface CustomerAttributes {
	id: number;
    netsuite_customer_id: string;
	company_name: string;
    web_address?: string;
    email_address: string;
    phone: string;
    alt_phone?: string;
    fax_number?: string;
    address: string;
}

interface CustomerCreationAttributes {
    netsuite_customer_id: string;
	company_name: string;
    web_address?: string;
    email_address: string;
    phone: String;
    alt_phone?: string;
    fax_number?: string;
    address: string;
	
}
export class Customer extends Model <CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes{

    public id: number;
    public netsuite_customer_id: string;
	public company_name: string;
    public web_address?: string;
    public email_address: string;
    public phone: string;
    public alt_phone?: string;
    public fax_number?: string;
	
    public address: string;


    public users: User[];
	


	public readonly created_at!: Date;
	public readonly updated_at!: Date;

    public static associations: {
        users: Association<Customer, User>;
	};

}
Customer.init(
	{
		id: {
			type: DataTypes.SMALLINT,
			autoIncrement: true,
			primaryKey: true,
		},
		netsuite_customer_id: {
			type: new DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		company_name: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		web_address: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		email_address: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: false,
		},
        alt_phone: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: false,
		},
        fax_number: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: false,
		},
        address: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		sequelize: db_conn,
		schema: process.env.DB_SCHEMA,
		tableName: 'customers',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
);

Customer.hasMany(User, { foreignKey: "customer_id"});