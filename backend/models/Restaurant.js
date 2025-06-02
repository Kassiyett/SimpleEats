const mongoose = require('mongoose');
const { resource } = require('../server');

// Menu Item Template
const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    cuisine: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        default: ''
    },
    available: {
        type: Boolean,
        default: true
    }
});
const restaurantSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    deliveryTime: {
      type: String,
      required: true
    },
    deliveryFee: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      default: ''
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    },
    menu: [menuItemSchema],
    isOpen: {
      type: Boolean,
      default: true
    },
    openingHours: {
      type: String,
      default: '9:00 AM - 10:00 PM'
    }
  }, {
    timestamps: true
});
  
restaurantSchema.index({cuisine:1});
restaurantSchema.index({rating: -1});
restaurantSchema.index({name: 'text', cuisine: 'text'});

module.exports = mongoose.model('Restaurant', restaurantSchema);