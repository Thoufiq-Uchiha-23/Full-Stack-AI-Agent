import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { inngets } from "../inngest/client.js";

export const signup = async (req, res) => {
  const { email, password, skills = [] } = req.body;

  try {
    const hashed = bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, skills });

    // Fire inngest event
    await inngest.send({
      name: "user/signup",
      data: {
        email,
      },
    });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({error: "Signup failed", details: error.message})
  }
};

export const login = async (req, res) => {}