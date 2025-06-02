const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MongoDB Connection
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 
            'mongodb://localhost:27017/simpleeats', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log('MongoDB is connected');
        } catch (error) {
            console.error('MongoDB Connection Error', error);
            process.exit(1);
        }
};

const restaurantRoutes = require('./routes/restaurants');
app.use('/api/restaurants', restaurantRoutes)

app.get('/api/health', (req, res) => {
    res.json({message: 'SimpleEats API is working'});
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Some Error' });
  });
  
  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
  
  // Start server
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
  
  module.exports = app;