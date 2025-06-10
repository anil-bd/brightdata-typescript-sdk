const { BrightDataClient } = require('../dist');

async function testBasic() {
  console.log('Testing basic import...');
  
  try {
    const client = new BrightDataClient('test-key');
    console.log('✅ Client created successfully');
    console.log('✅ Web Unlocker service available:', !!client.webUnlocker);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testBasic();