import {
  createUser,
  findUserByEmail,
  findUserByLogin,
  findUserByUsername
} from "../services/userService.js";

function toSafeUser(user) {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt
  };
}

export async function signup(req, res) {
  try {
    const {
      username,
      firstName,
      lastName,
      gender,
      email,
      phone,
      password,
      confirmPassword
    } = req.body;

    if (
      !username ||
      !firstName ||
      !gender ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match."
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters."
      });
    }

    const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

    if (!phoneRegex.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number."
      });
    }

    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    const existingUsername = await findUserByUsername(username);

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "This username is already taken."
      });
    }

    const user = await createUser({
      username,
      firstName,
      lastName,
      gender,
      email,
      phone,
      password
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: toSafeUser(user)
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create account."
    });
  }
}

export async function login(req, res) {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({
        success: false,
        message: "Username/email and password are required."
      });
    }

    const user = await findUserByLogin(login);

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: toSafeUser(user)
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to login."
    });
  }
}
