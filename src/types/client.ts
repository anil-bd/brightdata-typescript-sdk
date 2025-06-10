import { HttpClient } from './http/http-client';
import { WebUnlockerService } from './services/web-unlocker-service';
import { BrightDataConfig } from './index';

// Main client interface
export interface IBrightDataClient {
  webUnlocker: WebUnlockerService;
}

export class BrightDataClient implements IBrightDataClient {
  private httpClient: HttpClient;
  public readonly webUnlocker: WebUnlockerService;

  constructor(config: string | BrightDataConfig) {
    // Normalize config
    const normalizedConfig: BrightDataConfig = typeof config === 'string' 
      ? { apiKey: config, zone: 'web_unlocker1' }  // Default zone if only API key is provided
      : config;

    if (!normalizedConfig.apiKey) {
      throw new Error('API key is required');
    }

    if (!normalizedConfig.zone) {
      throw new Error('Zone is required in config');
    }

    // Initialize HTTP client with default configuration
    this.httpClient = new HttpClient({
      apiKey: normalizedConfig.apiKey,
      baseUrl: normalizedConfig.baseUrl,
      timeout: normalizedConfig.timeout
    });

    // Initialize Web Unlocker service
    this.webUnlocker = new WebUnlockerService(this.httpClient, normalizedConfig.zone);
  }
} 