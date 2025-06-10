// Main exports
export { BrightDataClient } from './types/client';
export type { IBrightDataClient } from './types/client';

// Type exports
export type {
  BrightDataConfig,
  UnlockOptions,
  UnlockResponse,
  IWebUnlockerService
} from './types';

// Error exports
export { BrightDataError } from './types';

// Service exports for advanced usage
export { WebUnlockerService } from './types/services/web-unlocker-service';

// Default export for convenience
import { BrightDataClient } from './types/client';
export default BrightDataClient; 