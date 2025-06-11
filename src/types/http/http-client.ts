import axios from 'axios';
import { BrightDataError, HttpClientConfig, ApiResponse } from '../index';

export class HttpClient {
  private client: ReturnType<typeof axios.create>;
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: 'https://api.brightdata.com', // Ensure correct base URL
      timeout: config.timeout,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
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

  async post<T>(url: string, data: Record<string, any>, config?: any): Promise<ApiResponse<T>> {
    try {
      // Ensure data is properly formatted as JSON string
      const requestData = JSON.stringify(data);
      
      const response = await this.client.post<T>(url, requestData, {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'application/json'
        }
      });
      
      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
        requestId: response.headers['x-request-id']
      };
    } catch (error: any) {
      if (error.response) {
        throw new BrightDataError(
          `API request failed: ${error.response.data?.message || error.message}`,
          error.response.status,
          error.response.data
        );
      }
      throw new BrightDataError(`Request failed: ${error.message}`);
    }
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