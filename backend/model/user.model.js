import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid name!`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
      password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
      },
      mobile: {
        type: Number,
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid mobile number!`,
        },
      },
      role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
      },
    },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      name: this.username,
      email: this.email,
      mobile: this.mobile || null,
      iat: Date.now() / 1000, // current timestamp in seconds
      exp: Date.now() / 1000 + 60 * 60 * 24 * 1, // 1 days from now
    },
    process.env.JWT_SECRET
  );
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
