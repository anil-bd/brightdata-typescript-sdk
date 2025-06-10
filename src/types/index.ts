// Base configuration
export interface BrightDataConfig {
  apiKey: string;
  zone: string;  // Required: Proxy zone to use for all requests
  baseUrl?: string;
  timeout?: number;
}

// Web Unlocker types - minimal confirmed parameters
export interface IWebUnlockerService {
  unlock(url: string, options: UnlockOptions): Promise<UnlockResponse>;
}

export interface UnlockOptions {
  async?: boolean;
  country?: string;  // Country code for the request
  format?: 'raw' | 'html' | 'markdown';
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data_format?: 'markdown' | 'html' | 'raw';
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
    public requestId?: string
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