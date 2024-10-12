// models/ContactSubmission.js

import mongoose from "mongoose";
// Define the schema
const contactSubmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, // Store email in lowercase
        validate: {
            validator: function (v) {
                // Simple regex for email validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    message: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the date to now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Add a pre-save hook to update the updatedAt field
contactSubmissionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create the model
const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);

// Export the model
export default ContactSubmission;