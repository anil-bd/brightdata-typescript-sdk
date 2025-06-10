"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebUnlockerService = void 0;
var types_1 = require("../types");
var WebUnlockerService = /** @class */ (function () {
    function WebUnlockerService(httpClient) {
        this.httpClient = httpClient;
    }
    WebUnlockerService.prototype.unlock = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, options) {
            var payload, queryParams, endpoint, response, error_1, err;
            var _a, _b;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!url || typeof url !== 'string') {
                            throw new types_1.BrightDataError('URL is required and must be a string');
                        }
                        if (!this.isValidUrl(url)) {
                            throw new types_1.BrightDataError('Invalid URL format');
                        }
                        payload = {
                            url: url,
                            async: options.async || false
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        queryParams = options.async ? '?async=true' : '';
                        endpoint = "/v1/web-unlocker/unlock".concat(queryParams);
                        return [4 /*yield*/, this.httpClient.post(endpoint, payload)];
                    case 2:
                        response = _c.sent();
                        return [2 /*return*/, {
                                content: response.data,
                                status: response.status,
                                headers: response.headers,
                                requestId: response.requestId,
                                url: url
                            }];
                    case 3:
                        error_1 = _c.sent();
                        if (error_1 instanceof types_1.BrightDataError) {
                            throw error_1;
                        }
                        err = error_1;
                        throw new types_1.BrightDataError("Failed to unlock website: ".concat(err.message || 'Unknown error'), (_a = err.response) === null || _a === void 0 ? void 0 : _a.status, (_b = err.response) === null || _b === void 0 ? void 0 : _b.data);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WebUnlockerService.prototype.isValidUrl = function (url) {
        try {
            new URL(url);
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    return WebUnlockerService;
}());
exports.WebUnlockerService = WebUnlockerService;
