// Base configuration
export interface BrightDataConfig {
  apiKey: string;
  zone: string;  // Required: Proxy zone to use for all requests
  baseUrl?: string;
  timeout?: number;
}

// Simplified configuration for beginners
export interface SimpleConfig {
  apiKey?: string;
  country?: string;
  format?: 'raw' | 'json';
  method?: 'GET' | 'POST';
}

// Default configuration for beginners
export const DEFAULT_CONFIG: SimpleConfig = {
  country: 'US',
  format: 'raw',
  method: 'GET'
};

// Web Unlocker types - minimal confirmed parameters
export interface IWebUnlockerService {
  unlock(url: string, options: UnlockOptions): Promise<UnlockResponse>;
}

export interface UnlockOptions {
  async?: boolean;
  country?: string;  // Country code for the request
  format?: 'raw' | 'json';
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data_format?: 'markdown' | 'screenshot';
}

export interface UnlockResponse {
  content: string;
  status: number;
  headers?: Record<string, string>;
  requestId?: string;
  url?: string;
}

// Error handling
export class BrightDataError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any,
    public requestId?: string,
    public suggestion?: string,
    public learnMoreUrl?: string
  ) {
    super(message);
    this.name = 'BrightDataError';
    Error.captureStackTrace(this, BrightDataError);
  }
}

// HTTP client types
export interface HttpClientConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  userAgent?: string;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, string>;
  requestId?: string;
}

// Export client types
export * from './client';
export * from './config';
export * from './error';
export { BrightData } from './simple-client'; 