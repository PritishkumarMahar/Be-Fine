import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otpGenerator.js";
import { sendEmail } from "../utils/emailSender.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const otp = generateOTP();
  const expiry = Date.now() + 1000 * 60 * 10;

  const user = await User.create({
    name,
    email,
    password: hashed,
    otp,
    otpExpiry: expiry,
  });
  await sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);
  res.status(201).json({ message: "User registered. Check email for OTP." });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();
  res.json({ message: "Email verified" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.isVerified) {
    return res.status(403).json({ message: "Email not verified" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  });
};


export const resendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const otp = generateOTP();
  const expiry = Date.now() + 1000 * 60 * 10;
  user.otp = otp;
  user.otpExpiry = expiry;
  await user.save();
  await sendEmail(email, "Resend OTP", `Your OTP is ${otp}`);
  res.json({ message: "OTP resent" });
};
