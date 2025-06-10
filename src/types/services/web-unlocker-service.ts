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

    if (!this.isValidUrl(url)) {
      throw new BrightDataError('Invalid URL format');
    }

    // Prepare payload according to BrightData API specs
    const payload = {
      url,
      zone: this.zone,
      format: options.format || 'raw',
      method: options.method || 'POST',
      country: options.country,
      data_format: options.data_format || 'markdown'
    };

    try {
      // Make POST request to /request endpoint
      const response = await this.httpClient.post<string>('/request', payload);

      return {
        content: response.data,
        status: response.status,
        headers: response.headers,
        requestId: response.requestId,
        url: url
      };
    } catch (error: unknown) {
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
    } catch {
      return false;
    }
  }
} 