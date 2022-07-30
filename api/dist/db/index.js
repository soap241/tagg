"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_conn = void 0;
const sequelize_1 = require("sequelize");
const params = 'postgres://' +
    process.env.DB_USER +
    ':' +
    process.env.DB_PASS +
    '@' +
    process.env.DB_HOST +
    ':' +
    process.env.DB_PORT +
    '/' +
    process.env.DB_NAME;
exports.db_conn = new sequelize_1.Sequelize(params, {
    logging: false,
    pool: {
        acquire: 5000,
        evict: 30000,
        idle: 10000,
        max: 5,
    },
    hooks: {
        afterConnect() {
            const dTypes = {
                DECIMAL: CustomDecimal,
                BIGINT: CustomBigInt,
            };
            this.connectionManager.refreshTypeParser(dTypes);
        },
    },
});
class CustomBigInt extends sequelize_1.DataTypes.BIGINT {
    static parse(value) {
        return parseInt(value);
    }
}
class CustomDecimal extends sequelize_1.DataTypes.DECIMAL {
    static parse(value) {
        return parseFloat(value);
    }
}
function custom_seq_logger(query_str, query_obj) {
    console.log(query_str);
    console.log(query_obj.bind);
}
