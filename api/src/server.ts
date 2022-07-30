import * as fs from 'fs'
import * as path from 'path'

import * as express from 'express'
import * as cors from 'cors'
import * as col from 'cli-color'
import * as cookieParser from 'cookie-parser'
import * as morgan from 'morgan'
import * as helmet from 'helmet'

import * as dotenv from 'dotenv'
dotenv.config();

import { _authClass } from './core/_auth.class'

import { db_init } from './db/init'


/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
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
    `),
      col.yellowBright("\n Customer Portal v1.0.0-dev"));
    console.log(col.yellow(" Copyright \u00a9 Process & Plant Automation Ltd.."));
    console.log(col.yellow(" All rights reserved."));
    console.log(col.white("---------------------------------------------------------------------------"));
  }

  public async init() {
    console.log(col.green(" assembling application... "));
    this.app = express();

    if (process.env.DB_INIT == "TRUE") {
      console.log(col.green(" deploying database... "));
      await db_init();
    }

    console.log(col.green(" molding middleware... "));
    await this.config();

    console.log(col.green(" raising routes... "));
    this.routes();

    console.log(col.green(" waking workers... "));
  }

  /**
   * Configure middlewares for application
   *
   * @class Server
   * @method config
   */
  private async config() {
    _authClass.inititalize_secrets(null);

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser(_authClass.gen_hash(24)));
    this.app.use(cors({ credentials: true, origin: process.env.CLIENT_URLS.split(',') }));
    this.app.use(helmet());
    this.app.use(morgan('combined'));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(_authClass.authenticate_route());
  }

  /**
   * Instantiate routes
   *
   * @class Server
   * @method routes
   */
  public routes() {
    let router: express.Router;
    router = express.Router();


    // autoload service routes
    fs
      .readdirSync(__dirname + '/routers')
      .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== '_base.router.js') && (file.slice(-10) === '.router.js');
      })
      .forEach(function (file) {
        if (file.startsWith('test') && process.env.DEBUG != 'TRUE')
          return;
        let r = require(__dirname + '/routers/' + file)
        r[Object.keys(r)[0]].init(router, (process.env.DEBUG == 'TRUE'));
      });

    //use router middleware
    this.app.use(router);
  }
}
