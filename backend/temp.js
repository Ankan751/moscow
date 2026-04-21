const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ankannewar4_db_user:hQL3efEuBn0NF0VU@cluster0.kq5adzn.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {
    const propertySchema = new mongoose.Schema({}, { strict: false });
    const Property = mongoose.model('Property', propertySchema, 'properties');
    const longLink = 'https://www.google.com/maps/place/Boys+Hostel+3,+Nit,+Jalandhar,+Gopalpur+Alias+Bidh,+Punjab+144008/@31.3956414,75.5249669,15z/';
    await Property.updateOne({ location: /model/i }, { '\': { googleMapLink: longLink } });
    console.log('Updated googleMapLink to long URL successfully.');
    process.exit(0);
}).catch(console.error);
