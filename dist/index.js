"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseAxios = exports.tunnel = void 0;
var axios_1 = require("axios");
exports.baseAxios = axios_1.default;
var tunnel = require("tunnel");
exports.tunnel = tunnel;
var _a = process.env, PROXY_HOST = _a.PROXY_HOST, PROXY_PORT = _a.PROXY_PORT, PROXY_USERNAME = _a.PROXY_USERNAME, PROXY_PASSWORD = _a.PROXY_PASSWORD;
var isProxyDefined = function () {
    return PROXY_HOST !== undefined && PROXY_PORT !== undefined;
};
var getProxyAuth = function () {
    if (PROXY_USERNAME && PROXY_PASSWORD) {
        return PROXY_USERNAME + ":" + PROXY_PASSWORD;
    }
    return;
};
var praxios = axios_1.default.create();
if (isProxyDefined()) {
    var httpsAgent = tunnel.httpsOverHttp({
        proxy: {
            host: PROXY_HOST,
            port: Number(PROXY_PORT),
            proxyAuth: getProxyAuth(),
        },
    });
    praxios = axios_1.default.create({ httpsAgent: httpsAgent, proxy: false });
}
exports.default = praxios;
