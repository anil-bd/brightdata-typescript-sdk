# Bright Data SDK

[![npm version](https://badge.fury.io/js/%40brightdata%2Fsdk.svg)](https://badge.fury.io/js/%40brightdata%2Fsdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official TypeScript/JavaScript SDK for Bright Data APIs. Currently supports Web Unlocker API.

## Features

- 🔓 **Web Unlocker API** - Bypass anti-bot measures and access any website
- 🛡️ **Built-in error handling** - Comprehensive error handling and retries
- 📝 **TypeScript support** - Full TypeScript definitions included

## Installation

(anil-brd-typescript-sdk)[https://www.npmjs.com/package/anil-brd-typescript-sdk]

```bash
npm install anil-brd-typescript-sdk
```

## Quick start
```Javascript 
import { BrightDataClient } from '@anil-brd-typescript-sdk';

const client = new BrightDataClient('your-api-key', zone: 'web_unlocker1');

async function example() {
  try {
    const result = await client.webUnlocker.unlock('https://example.com');
    console.log(result.content);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Web Unlocker API 

```Javascript 

// Simple unlock
const result = await client.webUnlocker.unlock('https://example.com');

// With options
const result = await client.webUnlocker.unlock('https://example.com', {
    country: 'US',
    format: 'raw',
    method: 'GET',
    data_format: 'markdown'
});
```

### Error Handling
```Javascript 

import { BrightDataError } from 'anil-brd-typescript-sdk';

try {
  const result = await client.webUnlocker.unlock('https://example.com');
} catch (error) {
  if (error instanceof BrightDataError) {
    console.log('Status Code:', error.statusCode);
    console.log('Request ID:', error.requestId);
    console.log('Response:', error.response);
  }
}
```