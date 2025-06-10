"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrightDataClient = void 0;
var http_client_1 = require("./http/http-client");
var web_unlocker_service_1 = require("./services/web-unlocker-service");
var BrightDataClient = /** @class */ (function () {
    function BrightDataClient(config) {
        // Normalize config
        var normalizedConfig = typeof config === 'string'
            ? { apiKey: config }
            : config;
        if (!normalizedConfig.apiKey) {
            throw new Error('API key is required');
        }
        // Initialize HTTP client with default configuration
        this.httpClient = new http_client_1.HttpClient({
            apiKey: normalizedConfig.apiKey,
            baseUrl: normalizedConfig.baseUrl,
            timeout: normalizedConfig.timeout
        });
        // Initialize Web Unlocker service
        this.webUnlocker = new web_unlocker_service_1.WebUnlockerService(this.httpClient);
    }
    return BrightDataClient;
}());
exports.BrightDataClient = BrightDataClient;
