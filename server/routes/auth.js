import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, dateOfBirth, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create new user
    const user = new User({
      name,
      email,
      dateOfBirth,
      password,
    })

    await user.save()

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    // Return user info and token (excluding password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
    }

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    // Return user info and token (excluding password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
    }

    res.json({
      message: "Login successful",
      user: userResponse,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router

