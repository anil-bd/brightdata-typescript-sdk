require('dotenv').config();
const { BrightDataClient, BrightDataError } = require('../dist');

async function runTests() {
  const apiKey = process.env.BRIGHTDATA_API_KEY;
  const zone = process.env.BRIGHTDATA_ZONE || 'web_unlocker1';
  
  if (!apiKey) {
    console.error('❌ BRIGHTDATA_API_KEY not found in environment');
    console.error('Please set BRIGHTDATA_API_KEY in your .env file');
    process.exit(1);
  }

  const client = new BrightDataClient({
    apiKey,
    zone,
    baseUrl: 'https://api.brightdata.com',
    timeout: 30000
  });

  // Test GET request
  try {
    console.log('Testing GET request...');
    const result = await client.webUnlocker.unlock('https://httpbin.org/get', {
      country: 'US',
      format: 'raw',
      method: 'GET',
      data_format: 'markdown'
    });
    
    console.log(`✅ GET request successful - Status: ${result.status}`);
    console.log(`📄 Content length: ${result.content.length} chars`);
    console.log(`🔍 Request ID: ${result.requestId}\n`);
  } catch (error) {
    if (error instanceof BrightDataError) {
      console.error(`❌ BrightData Error: ${error.message}`);
      console.error(`   Status: ${error.statusCode}`);
      console.error(`   Request ID: ${error.requestId}\n`);
    } else {
      console.error(`❌ Unexpected Error: ${error.message}\n`);
    }
  }

  // Test POST request
  try {
    console.log('Testing POST request...');
    const result = await client.webUnlocker.unlock('https://httpbin.org/post', {
      country: 'US',
      format: 'raw',
      method: 'POST',
      data_format: 'markdown'
    });
    
    console.log(`✅ POST request successful - Status: ${result.status}`);
    console.log(`📄 Content length: ${result.content.length} chars`);
    console.log(`🔍 Request ID: ${result.requestId}\n`);
  } catch (error) {
    if (error instanceof BrightDataError) {
      console.error(`❌ BrightData Error: ${error.message}`);
      console.error(`   Status: ${error.statusCode}`);
      console.error(`   Request ID: ${error.requestId}\n`);
    } else {
      console.error(`❌ Unexpected Error: ${error.message}\n`);
    }
  }

  // Test with screenshot format
  try {
    console.log('Testing with screenshot format...');
    const result = await client.webUnlocker.unlock('https://httpbin.org/html', {
      country: 'US',
      format: 'raw',
      method: 'GET',
      data_format: 'screenshot'
    });
    console.log(`✅ Screenshot format test passed - Status: ${result.status}\n`);
  } catch (error) {
    console.error('❌ Screenshot format test failed:', error.message);
  }
}

runTests().catch(console.error);