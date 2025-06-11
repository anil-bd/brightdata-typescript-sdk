                                                                                                                  require('dotenv').config();
const { BrightData } = require('../dist');

// Create client and fetch HTML in one go
new BrightData(process.env.BRIGHTDATA_API_KEY)
  .getScreenshot('https://example.com')
  .then(html => console.log(html))
  .catch(console.error);
  