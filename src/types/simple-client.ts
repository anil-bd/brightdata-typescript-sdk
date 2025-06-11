import { BrightDataClient } from './client';
import { SimpleConfig, DEFAULT_CONFIG } from './config';
import { BrightDataError } from './error';

export class BrightData {
  private client: BrightDataClient;
  private config: SimpleConfig;

  constructor(apiKey: string, config?: Omit<SimpleConfig, 'apiKey'>) {
    if (!apiKey) {
      throw new BrightDataError(
        'API key is required',
        undefined,
        undefined,
        undefined,
        'Get your key at https://dashboard.brightdata.com/api-keys',
        'https://brightdata.com/docs/api-keys'
      );
    }

    this.config = { 
      ...DEFAULT_CONFIG, 
      ...config,
      apiKey 
    };
    this.client = new BrightDataClient({
      apiKey: this.config.apiKey!,
      zone: 'web_unlocker1',
      timeout: 30000
    });
  }

  // Simple Interface Methods
  async getHtml(url: string, country?: string): Promise<string> {
    return this.unlock(url, { format: 'raw', country });
  }

  async getMarkdown(url: string, country?: string): Promise<string> {
    return this.unlock(url, { data_format: 'markdown', country });
  }

  async getScreenshot(url: string, country?: string): Promise<Buffer> {
    return this.unlock(url, { data_format: 'screenshot', country });
  }

  async getJson(url: string, country?: string): Promise<any> {
    return this.unlock(url, { format: 'json', country });
  }

  // Unified unlock method that works with all options
  async unlock(url: string, options?: Partial<Omit<SimpleConfig, 'apiKey'>>): Promise<any> {
    try {
      if (!url) {
        throw new BrightDataError('URL is required');
      }

      // Only merge non-data_format options from config
      const { data_format, ...configWithoutDataFormat } = this.config;
      const mergedOptions = { ...configWithoutDataFormat, ...options };
      
      const requestOptions = {
        url,
        ...(mergedOptions.country && { country: mergedOptions.country }),
        format: mergedOptions.format || 'raw' as const,
        method: mergedOptions.method || 'GET' as const,
        ...(options?.data_format && { data_format: options.data_format })
      };

      const result = await this.client.webUnlocker.unlock(url, requestOptions);
    
      // Return just the content for simple interface
      if (options?.format === 'raw' || options?.format === 'json') {
        return result.content;
      }
      
      // Return full response for other cases
      return result;
    } catch (error: unknown) {
      if (error instanceof BrightDataError) {
        throw error;
      }
      const err = error as { message?: string };
      throw new BrightDataError(
        `Failed to unlock website: ${err.message || 'Unknown error'}`,
        undefined,
        undefined,
        undefined,
        'Try using a different country or format',
        'https://brightdata.com/docs/troubleshooting'
      );
    }
  }
} 