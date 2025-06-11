export interface SimpleConfig {
  apiKey?: string;
  country?: string;
  format?: 'raw' | 'json';
  method?: 'GET' | 'POST';
  data_format?: 'markdown' | 'screenshot';
}

export const DEFAULT_CONFIG: SimpleConfig = {
  country: 'US',
  format: 'raw',
  method: 'GET'
}; 