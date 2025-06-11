// Simple demo for beginners
require('dotenv').config();
const { BrightData } = require('../dist');

// Step 1: Create a new client with your API key
const brightdata = new BrightData(process.env.BRIGHTDATA_API_KEY);

// Step 2: Try to unlock a website
brightdata.unlock('https://example.com', {
  country: 'US'  // Optional: specify country
})
  .then(result => {
    // Step 3: Print the content
    console.log('✅ Success! Here is the content:');
    console.log(result.content);
  })
  .catch(error => {
    // Step 4: Handle any errors
    console.error('❌ Error:', error.message);
  }); 