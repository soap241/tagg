import { Sequelize, DataTypes } from 'sequelize';

const params: string =
	'postgres://' +
	process.env.DB_USER +
	':' +
	process.env.DB_PASS +
	'@' +
	process.env.DB_HOST +
	':' +
	process.env.DB_PORT +
	'/' +
	process.env.DB_NAME;

// Connection object
export const db_conn = new Sequelize(params, {
	logging: false,
	pool: {
		acquire: 5000,
		evict: 30000,
		idle: 10000,
		max: 5,
	},
	hooks: {
		afterConnect(): Promise<void> | void {
			const dTypes = {
				DECIMAL: CustomDecimal,
				BIGINT: CustomBigInt,
			};
			(this as any as Sequelize).connectionManager.refreshTypeParser(dTypes);
		},
	},
});

class CustomBigInt extends (DataTypes.BIGINT as DataTypes.NumberDataTypeConstructor) {
	static parse(value: string): number {
		return parseInt(value);
	}
}

class CustomDecimal extends (DataTypes.DECIMAL as DataTypes.NumberDataTypeConstructor) {
	static parse(value: string): number {
		return parseFloat(value);
	}
}

function custom_seq_logger(query_str, query_obj) {
	console.log(query_str);
	console.log(query_obj.bind);
}
