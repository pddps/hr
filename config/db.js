const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;