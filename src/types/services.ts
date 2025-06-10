import { UnlockOptions, UnlockResponse } from './index';

// Web Unlocker service interface
export interface IWebUnlockerService {
  unlock(url: string, options?: UnlockOptions): Promise<UnlockResponse>;
}

// Main client interface
export interface IBrightDataClient {
  webUnlocker: IWebUnlockerService;
} 