import { compareSync } from 'bcryptjs'
import { body } from 'express-validator'
import { Op } from 'sequelize'

import { User } from '../db/models/User'


export const UserRules = {
	login: [
    body('user')
      .custom(({ username, password }) => {
        return User.findOne({ where: { username: username } })
          .then(u => {
            if (!u || !compareSync(password, u.password)){
              throw new Error('cvalerr:invalid username or password');
            } else if (!u.can_login) {
              throw new Error('cvalerr:this account is disabled');
            }
          }).catch(err => {
            let error_str: string = err.toString();
            if (error_str.includes('cvalerr:')) {
              throw new Error(error_str.replace('Error: cvalerr:', ''));
            } else {
              if (process.env.DEBUG == 'TRUE'){
                console.log("UserRules[login]: ", err);
              } throw new Error('oops, something went wrong');
            }
          })
      })
  ],

	logout: [

  ],

	password: [
    body()
      .custom(({ user, passwords }) => {
        return User.findOne({ where: { id: user.id } })
          .then(u => {
            if (passwords.new.length < 8) {
              throw new Error('cvalerr:new password is too short');
            }
            if (passwords.new != passwords.confirm) {
              throw new Error('cvalerr:confirm password does not match new password');
            }
            if (!compareSync(passwords.old, u.password)) {
              throw new Error('cvalerr:current password is incorrect');
            }
            if (compareSync(passwords.new, u.password)) {
              throw new Error('cvalerr:new password is the same as current password');
            }
          }).catch(err => {
            let error_str: string = err.toString();
            if (error_str.includes('cvalerr:')) {
              throw new Error(error_str.replace('Error: cvalerr:', ''));
            } else {
              if (process.env.DEBUG == 'TRUE'){
                console.log("UserRules[password]: ", err);
              } throw new Error('oops, something went wrong');
            }
          })
      })
	],

	create: [
    body('user_data.fullname')
      .trim().matches(/^[a-zA-Z. ]+$/i).withMessage('full name can only contain letters and spaces'),

    body('user_data.username')
      .trim().isAlphanumeric().withMessage('username can only contain letters and numbers')
      .bail()
      .custom((username) => {
        return User.findOne({ where: { username: username } })
          .then(u => {
            if (u) {
              throw new Error('cvalerr:username is already in use');
            }
          }).catch(err => {
            let error_str: string = err.toString();
            if (error_str.includes('cvalerr:')) {
              throw new Error(error_str.replace('Error: cvalerr:', ''));
            } else {
              if (process.env.DEBUG == 'TRUE'){
                console.log("UserRules[create]: ", err);
              } throw new Error('oops, something went wrong');
            }
          })
      })
	],

	modify: [
    body('user_data.fullname')
      .trim().matches(/^[a-zA-Z. ]+$/i).withMessage('full name can only contain letters and spaces'),

    body('user_data.username')
      .trim().isAlphanumeric().withMessage('username can only contain letters and numbers'),

    body('user_data')
      .custom(({id, username}) => {
        return User.findOne({ where: { [Op.and]: [{ username }, { id: { [Op.ne]: id } }] } })
          .then(u => {
            if (u) {
              throw new Error('cvalerr:username is already in use');
            }
          }).catch(err => {
            let error_str: string = err.toString();
            if (error_str.includes('cvalerr:')) {
              throw new Error(error_str.replace('Error: cvalerr:', ''));
            } else {
              if (process.env.DEBUG == 'TRUE'){
                console.log("UserRules[modify]: ", err);
              } throw new Error('oops, something went wrong');
            }
          })
      })
	],

	transfer: [
		body('transfer_data.amount')
      .isFloat({min: 0}).withMessage('amount must be greater than zero!')
  ],

	reset: [

  ],

	delete: [

  ]
}
