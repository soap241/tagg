"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRouter = void 0;
const _base_router_1 = require("./_base.router");
class TestRouter extends _base_router_1._baseRouter {
    constructor() {
        super();
    }
    static init(router, verbose) {
        if (verbose) {
            console.log(' [TestRouter::init] Creating Test routes.');
        }
        router.get(process.env.API_BASE + '/test', (req, res, next) => {
            (new TestRouter()).test_handler(req, res);
        });
    }
    test_handler(req, res) {
        this.send_response(res, true, { 'msg': 'Hello World', 'package': {} });
    }
}
exports.TestRouter = TestRouter;
