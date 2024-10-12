import express, { json } from "express";
import userModel from "./model/user.model.js";
import connectDB from "./db/Db.js";
import cookies from "cookie-parser";
import cors from "cors";
import contactSubmission from "./model/contact.model.js";
import router from "./router/index.router.js";

connectDB();
const app = express();
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS with specific origin and credentials
app.use(cors({
  origin: 'http://localhost:5173', // Allow only the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Allow credentials (cookies) to be sent
}));

// Handle preflight requests (HTTP OPTIONS)
app.options('*', cors());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
