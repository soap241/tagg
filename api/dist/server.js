"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const col = require("cli-color");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();
const _auth_class_1 = require("./core/_auth.class");
const init_1 = require("./db/init");
class Server {
    constructor() {
        console.log(col.white("==========================================================================="));
        console.log(col.redBright(`
        (((((  `), col.blueBright(`##
   %###  `), col.redBright(`(((((  `), col.blueBright(` ##
  ####  ## `), col.redBright(`(((( `), col.blueBright(` # ###
 ####%  #### `), col.redBright(`((((  `), col.blueBright(`## ##    #########   &###      #########   %########
 #####  #####  `), col.redBright(`(((( `), col.blueBright(`### ##     ###     ######   %##          ##%
 %#####  ######       #### ##    ###    ###  ###  ###    #### ###    #####
   ######  ############### ##    ###   ##########  ###     ##  ###     ###
    #######   %#########  ###    ###  ###       ##   #######     #######
      (########         #####
         ##################%
              ###########
    `), col.yellowBright("\n Customer Portal v1.0.0-dev"));
        console.log(col.yellow(" Copyright \u00a9 Process & Plant Automation Ltd.."));
        console.log(col.yellow(" All rights reserved."));
        console.log(col.white("---------------------------------------------------------------------------"));
    }
    async init() {
        console.log(col.green(" assembling application... "));
        this.app = express();
        if (process.env.DB_INIT == "TRUE") {
            console.log(col.green(" deploying database... "));
            await init_1.db_init();
        }
        console.log(col.green(" molding middleware... "));
        await this.config();
        console.log(col.green(" raising routes... "));
        this.routes();
        console.log(col.green(" waking workers... "));
    }
    async config() {
        _auth_class_1._authClass.inititalize_secrets(null);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser(_auth_class_1._authClass.gen_hash(24)));
        this.app.use(cors({ credentials: true, origin: process.env.CLIENT_URLS.split(',') }));
        this.app.use(helmet());
        this.app.use(morgan('combined'));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(_auth_class_1._authClass.authenticate_route());
    }
    routes() {
        let router;
        router = express.Router();
        fs
            .readdirSync(__dirname + '/routers')
            .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== '_base.router.js') && (file.slice(-10) === '.router.js');
        })
            .forEach(function (file) {
            if (file.startsWith('test') && process.env.DEBUG != 'TRUE')
                return;
            let r = require(__dirname + '/routers/' + file);
            r[Object.keys(r)[0]].init(router, (process.env.DEBUG == 'TRUE'));
        });
        this.app.use(router);
    }
}
exports.Server = Server;
