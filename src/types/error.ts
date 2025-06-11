export class BrightDataError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public requestId?: string,
    public suggestion?: string,
    public learnMoreUrl?: string
  ) {
    super(message);
    this.name = 'BrightDataError';
  }
} 