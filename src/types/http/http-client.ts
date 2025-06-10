import axios from 'axios';
import { BrightDataError, HttpClientConfig, ApiResponse } from '../index';

export class HttpClient {
  private client: ReturnType<typeof axios.create>;
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl || 'https://api.brightdata.com',
      timeout: config.timeout || 30000,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': config.userAgent || '@brightdata/sdk/1.0.0'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add request ID for tracing
        if (config.headers) {
          config.headers['X-Request-ID'] = this.generateRequestId();
        }
        return config;
      },
      (error: unknown) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        const axiosError = error as any;
        const message = axiosError.response?.data?.message || axiosError.message;
        const statusCode = axiosError.response?.status;
        const requestId = axiosError.config?.headers?.['X-Request-ID'];
        
        throw new BrightDataError(
          message,
          statusCode,
          axiosError.response?.data,
          requestId
        );
      }
    );
  }

  private generateRequestId(): string {
    return `bd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    // Debug log for outgoing POST requests
    console.log('[HttpClient] POST', url, JSON.stringify(data, null, 2));
    const response = await this.client.post(url, data, config);
    return this.formatResponse(response);
  }

  async get<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await this.client.get(url, config);
    return this.formatResponse(response);
  }

  private formatResponse<T>(response: any): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
      requestId: response.config?.headers?.['X-Request-ID']
    };
  }
} 