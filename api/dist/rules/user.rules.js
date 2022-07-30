"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRules = void 0;
const bcryptjs_1 = require("bcryptjs");
const express_validator_1 = require("express-validator");
const sequelize_1 = require("sequelize");
const User_1 = require("../db/models/User");
exports.UserRules = {
    login: [
        express_validator_1.body('user')
            .custom(({ username, password }) => {
            return User_1.User.findOne({ where: { username: username } })
                .then(u => {
                if (!u || !bcryptjs_1.compareSync(password, u.password)) {
                    throw new Error('cvalerr:invalid username or password');
                }
                else if (!u.can_login) {
                    throw new Error('cvalerr:this account is disabled');
                }
            }).catch(err => {
                let error_str = err.toString();
                if (error_str.includes('cvalerr:')) {
                    throw new Error(error_str.replace('Error: cvalerr:', ''));
                }
                else {
                    if (process.env.DEBUG == 'TRUE') {
                        console.log("UserRules[login]: ", err);
                    }
                    throw new Error('oops, something went wrong');
                }
            });
        })
    ],
    logout: [],
    password: [
        express_validator_1.body()
            .custom(({ user, passwords }) => {
            return User_1.User.findOne({ where: { id: user.id } })
                .then(u => {
                if (passwords.new.length < 8) {
                    throw new Error('cvalerr:new password is too short');
                }
                if (passwords.new != passwords.confirm) {
                    throw new Error('cvalerr:confirm password does not match new password');
                }
                if (!bcryptjs_1.compareSync(passwords.old, u.password)) {
                    throw new Error('cvalerr:current password is incorrect');
                }
                if (bcryptjs_1.compareSync(passwords.new, u.password)) {
                    throw new Error('cvalerr:new password is the same as current password');
                }
            }).catch(err => {
                let error_str = err.toString();
                if (error_str.includes('cvalerr:')) {
                    throw new Error(error_str.replace('Error: cvalerr:', ''));
                }
                else {
                    if (process.env.DEBUG == 'TRUE') {
                        console.log("UserRules[password]: ", err);
                    }
                    throw new Error('oops, something went wrong');
                }
            });
        })
    ],
    create: [
        express_validator_1.body('user_data.fullname')
            .trim().matches(/^[a-zA-Z. ]+$/i).withMessage('full name can only contain letters and spaces'),
        express_validator_1.body('user_data.username')
            .trim().isAlphanumeric().withMessage('username can only contain letters and numbers')
            .bail()
            .custom((username) => {
            return User_1.User.findOne({ where: { username: username } })
                .then(u => {
                if (u) {
                    throw new Error('cvalerr:username is already in use');
                }
            }).catch(err => {
                let error_str = err.toString();
                if (error_str.includes('cvalerr:')) {
                    throw new Error(error_str.replace('Error: cvalerr:', ''));
                }
                else {
                    if (process.env.DEBUG == 'TRUE') {
                        console.log("UserRules[create]: ", err);
                    }
                    throw new Error('oops, something went wrong');
                }
            });
        })
    ],
    modify: [
        express_validator_1.body('user_data.fullname')
            .trim().matches(/^[a-zA-Z. ]+$/i).withMessage('full name can only contain letters and spaces'),
        express_validator_1.body('user_data.username')
            .trim().isAlphanumeric().withMessage('username can only contain letters and numbers'),
        express_validator_1.body('user_data')
            .custom(({ id, username }) => {
            return User_1.User.findOne({ where: { [sequelize_1.Op.and]: [{ username }, { id: { [sequelize_1.Op.ne]: id } }] } })
                .then(u => {
                if (u) {
                    throw new Error('cvalerr:username is already in use');
                }
            }).catch(err => {
                let error_str = err.toString();
                if (error_str.includes('cvalerr:')) {
                    throw new Error(error_str.replace('Error: cvalerr:', ''));
                }
                else {
                    if (process.env.DEBUG == 'TRUE') {
                        console.log("UserRules[modify]: ", err);
                    }
                    throw new Error('oops, something went wrong');
                }
            });
        })
    ],
    transfer: [
        express_validator_1.body('transfer_data.amount')
            .isFloat({ min: 0 }).withMessage('amount must be greater than zero!')
    ],
    reset: [],
    delete: []
};
