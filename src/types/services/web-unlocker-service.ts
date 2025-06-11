import { HttpClient } from '../http/http-client';
import { IWebUnlockerService, UnlockOptions, UnlockResponse, BrightDataError } from '../index';

export class WebUnlockerService implements IWebUnlockerService {
  private httpClient: HttpClient;
  private zone: string;

  constructor(httpClient: HttpClient, zone: string) {
    this.httpClient = httpClient;
    this.zone = zone;
  }

  async unlock(url: string, options: UnlockOptions): Promise<UnlockResponse> {

    if (!url || typeof url !== 'string') {
      throw new BrightDataError('URL is required and must be a string');
    }

    // Clean and validate URL
    try {
      // Add https:// if protocol is missing
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      // Validate URL format using our helper method
      if (!this.isValidUrl(url)) {
        throw new Error('Invalid URL format');
      }
    } catch (error) {
      console.log('❌ URL validation failed:', error);
      throw new BrightDataError(`Invalid URL format: ${url}`);
    }

    // Prepare payload according to BrightData API specs
    const requestData = {
      url: url,
      zone: this.zone,
      format: options.format || 'raw',
      method: options.method || 'GET',
      ...(options.country && { country: options.country }),
      ...(options?.data_format && { data_format: options.data_format })
    };

    try {
      // Make POST request to /request endpoint
      if (!requestData || Object.keys(requestData).length === 0) {
        throw new BrightDataError('Request data is empty or undefined');
      }

      const response = await this.httpClient.post<string>('/request', requestData);

      // Ensure we have valid content
      if (!response.data) {
        console.log('❌ No content in response');
        throw new BrightDataError('No content received from the server');
      }

      // Convert content to string if it's not already
      const content = typeof response.data === 'string' 
        ? response.data 
        : JSON.stringify(response.data);

      return {
        content,
        status: response.status || 200,
        headers: response.headers || {},
        requestId: response.requestId,
        url: url
      };
    } catch (error: unknown) {
      console.log('❌ Request failed:', error);
      if (error instanceof BrightDataError) {
        throw error;
      }
      
      const err = error as { message?: string; response?: { status?: number; data?: any } };
      throw new BrightDataError(
        `Failed to unlock website: ${err.message || 'Unknown error'}`,
        err.response?.status,
        err.response?.data
      );
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
}