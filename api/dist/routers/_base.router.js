"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._baseRouter = void 0;
const fs_1 = require("fs");
const express_validator_1 = require("express-validator");
class _baseRouter {
    constructor() {
    }
    static validate(validations) {
        return async (req, res, next) => {
            await Promise.all(validations[((req.url.split('/').pop()).replace(/-/g, '_'))].map(validation => validation.run(req)));
            const errors = express_validator_1.validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }
            const err_arr = errors.array();
            (new _baseRouter()).send_response(res, false, { package: {}, msg: err_arr[0]['msg'] });
            return;
        };
    }
    send_response(res, success, data) {
        var _package = { "success": success,
            "data": (data.package ? data.package : {}),
            "msg": (data.msg ? data.msg : ''),
            "other": {} };
        if (data['other']) {
            _package['other'] = data['other'];
            delete data['other'];
        }
        res.json(_package);
    }
    send_file(res, filename = '', delete_file = true) {
        res.download(filename, () => {
            if (delete_file)
                fs_1.unlinkSync(filename);
        });
    }
    send_file_stream(res, stream = {}) {
        res.set('Content-Disposition', stream['disposition']);
        res.set('Content-Type', stream['mime_type']);
        stream['file'].pipe(res);
    }
    send_error(res, error, error_msg = 'Server Error') {
        var caller_line = error.stack.split("\n")[1];
        var index = caller_line.indexOf(".js:");
        var clean = caller_line.slice(index + 4, (caller_line.length - 1));
        console.log("ERROR: " + error + " AT " + clean);
        var response = { "success": false,
            "data": {},
            "msg": error_msg,
            "other": {} };
        res.statusCode = 500;
        res.json(response);
    }
}
exports._baseRouter = _baseRouter;
