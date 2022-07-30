import { unlinkSync } from 'fs';

import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator'

/**
 * Constructor
 *
 * @class _baseRouter
 */
export class _baseRouter {
  /**
   * Constructor
   *
   * @class BaseRoute
   * @constructor
   */
  constructor() {
  }

  /**
   * Handle validations uniformly for routed requests.
   *
   * @class _baseRoute
   * @method validate
   * @param validations {any[]} the set of validations for the route group, to be selected with the URL tail
   * @return void
   */
  protected static validate(validations) {
    return async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(validations[((req.url.split('/').pop()).replace(/-/g, '_'))].map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      const err_arr = errors.array();
      (new _baseRouter()).send_response(res, false, {package: {}, msg: err_arr[0]['msg']});
      return;
    };
  }

  /**
   * Send a JSON response.
   *
   * @class _baseRoute
   * @method send_response
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   * @param data {any} The data to be sent as a JSON string
   * @param options {Object} any other data
   * @return void
   */
  public send_response(res: Response, success: boolean, data: any) {
    var _package = {  "success": success,
                      "data": (data.package? data.package : {}),
                      "msg": (data.msg? data.msg : ''),
                      "other": {}      };

    if (data['other']) {
      _package['other'] = data['other'];
      delete data['other'];
    }

    res.json(_package);
  }

  /**
   * Send a file.
   *
   * @class _baseRoute
   * @method send_file
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   * @param filename {string} The path of the file to be sent.
   * @param delete_file {bool} Delete the file after download?
   * @return void
   */
  public send_file(res: Response, filename: string = '', delete_file: boolean = true) {
    res.download(filename, () => {
      if (delete_file) unlinkSync(filename);
    });
  }

  /**
   * Send a file stream.
   *
   * @class _baseRoute
   * @method send_file_stream
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   * @param stream {string} The readable filestream.
   * @return void
   */
  public send_file_stream(res: Response, stream: any = {}) {
    res.set('Content-Disposition', stream['disposition']);
    res.set('Content-Type', stream['mime_type']);
    stream['file'].pipe(res);
  }

  //TODO: Error handling
  /**
   * Send a JSON response after an error.
   *
   * @class _baseRoute
   * @method send_error
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   * @param error {any} The error object
   * @param error_msg {string} Custom error message from the error response block
   * @param options {Object} any other data
   * @return void
   */
  public send_error(res: Response, error: any, error_msg: any = 'Server Error') {
    // log error nicely
    var caller_line: string = error.stack.split("\n")[1];
		var index: number = caller_line.indexOf(".js:");
		var clean: string = caller_line.slice(index+4, (caller_line.length - 1));
		console.log("ERROR: " + error + " AT " + clean); //handle errors better

    var response = { "success": false,
											"data": {}, //error, if necessary
											"msg": error_msg,
											"other": {}       };

    res.statusCode = 500;
    res.json(response);
  }
}