import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./locker.env" });
const Schema = mongoose.Schema;

const userData = new Schema({
  username: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

const contactData = new Schema({
  username: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  phone: {
    type: Number,
  },
  message: {
    type: "string",
    required: true,
  },
});

const serviceSchema = new Schema({
  service: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  price: {
    type: "string",
    required: true,
  },
  provider: {
    type: "string",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
});

userData.pre("save", async function (next) {
  const data = this;

  if (!data.isModified("password")) {
    next();
  }
  try {
    const hashPassword = await bcrypt.hash(data.password, 12);
    data.password = hashPassword;
  } catch (err) {
    console.log("----->", err);
  }
});

userData.methods.generateToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id.toString(), email: this.email, isAdmin: this.isAdmin },
      process.env.JWT_SECTECT_KEY,
      { expiresIn: "30d" }
    );
  } catch (err) {
    console.log("----->", err);
  }
};

userData.methods.decrypt = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (err) {
    console.log("decrypt ---->>>>>>", err);
  }
};

const Contact = mongoose.model("contactData", contactData);
const User = mongoose.model("UserData", userData);
const Service = mongoose.model("Service", serviceSchema);
export { User, Contact, Service };
