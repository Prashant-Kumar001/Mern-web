import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  features: {
    type: [String], 
    required: true,
  },
});

// Create and export the model
const Service = mongoose.model('service', serviceSchema);

export default Service;