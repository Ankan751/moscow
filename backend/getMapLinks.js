const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/realestate', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => mongoose.connection.db.collection('properties').find({ googleMapLink: { $exists: true, $ne: null } }).toArray())
  .then(docs => {
     docs.forEach(d => console.log(d.name + ' -> ' + d.googleMapLink));
     process.exit();
  })
  .catch(err => {
     console.error('Error:', err);
     process.exit(1);
  });
