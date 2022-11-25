import { _baseClass } from './_base.class'
import { Op, Transaction as SeqTransaction } from 'sequelize'

import { db_conn } from '../db'
import { Customer } from '../db/models/Customer'

export class CustomerClass extends _baseClass {
   

    async create_customer(payload: Customer) {

        
		// start sequelize transaction
		const t: SeqTransaction = await db_conn.transaction();
        
        try {
            const customer = await Customer.create(payload, { transaction: t }) 

            t.commit()

            return { customer }
        } catch (error) {
            console.log(error);
			t.rollback();
			throw (error);
        }

    }

    async edit_customer({id, company_name, phone, email_address, web_address, netsuite_customer_id, fax_number, alt_phone, address}: Customer) {

        // start sequelize transaction
		const t: SeqTransaction = await db_conn.transaction();

        try {

            return Customer.update({company_name, phone, email_address, web_address, netsuite_customer_id, fax_number, alt_phone, address}, { where: { id }, returning: true })
            
        } catch (error) {

            console.log(error);
			t.rollback();
			throw (error);
            
        }

    }
}