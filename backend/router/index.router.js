import express from "express";
const router = express.Router();

// Importing Controllers
import { 
  getData, 
  handlerSignup, 
  handlerLogin, 
  contactFormHandler, 
  forgetPasswordHandler, 
  userDeleteHandler, 
  userUpdateHandler,
  checkUserHandler,
  serviceHandler
} from "../controller/index.controller.js";
import { authentication } from "../middleware/auth.middleware.js";

// Public Routes
router.get("/", getData);            // Default page
router.post("/signup", handlerSignup);   // User signup
router.post("/login", handlerLogin);     // User login

// User-specific Routes
router.put("/update/:email", userUpdateHandler);    // Update user by email
router.put("/forget/:email", forgetPasswordHandler); // Handle forgotten password
router.post("/delete/:user/:email", userDeleteHandler); // Delete user by username and email

// Contact Route
router.post("/contact", contactFormHandler);    // Handle contact form submissions

// Service route
router.get("/services", serviceHandler);

// User check route 
router.post("/check", authentication, checkUserHandler);

export default router;
