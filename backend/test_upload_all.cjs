const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const path = require('path');

async function testUpload() {
  try {
    const filePath = path.join(__dirname, '../frontend/src/assets/a7676918e1dc434feaadab5681b847444351d062.png');
    const form = new FormData();
    form.append('id', '69de744480269d156ef6d91a');
    form.append('title', 'Test Property');
    form.append('location', 'Test Location');
    form.append('price', '100000');
    form.append('beds', '3');
    form.append('baths', '2');
    form.append('sqft', '1500');
    form.append('type', 'House');
    form.append('availability', 'rent');
    form.append('description', 'A nice test house');
    form.append('amenities[0]', 'Gym');
    form.append('phone', '1234567890');
    // Using image1 to match multer config
    form.append('image1', fs.createReadStream(filePath));
    
    console.log("Sending request...");
    const response = await axios.post('http://localhost:4000/api/products/update', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    console.log('Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.status, error.response.data);
    } else {
      console.error('Request Error:', error.message);
    }
  }
}

testUpload();
