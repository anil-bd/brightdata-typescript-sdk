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
// Create client with your API key
const scraper = new BrightData('your-api-key');

// Basic unlocking
const html = await scraper.getHtml('https://example.com');
console.log(html);

// Get markdown content
const markdown = await scraper.getMarkdown('https://example.com');
console.log(markdown);

// Get screenshot
const screenshot = await scraper.getScreenshot('https://example.com');

// Custom options
const result = await scraper.unlock('https://example.com', {
  country: 'US',
  format: 'raw',
  method: 'GET',
  data_format: 'markdown'
});
```