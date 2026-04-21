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
    form.append('image1', fs.createReadStream(filePath)); // Field name must match the one used by upload.fields
    
    // We are simulating Update.jsx logic which actually sends image1 when submitting a new image:
    // value.forEach((image, i) => formdata.append(`image${i + 1}`, image));
    
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
