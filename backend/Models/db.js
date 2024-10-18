const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI; // Use the correct environment variable

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

 