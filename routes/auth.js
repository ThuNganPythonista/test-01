const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/account");
const authController = require("../controllers/auth");

/**
 * @route POST /auth/register
 * @summary Register a new user
 * @body {RegisterInput} 200 - Registration input
 * @returns 200 - Registration successful
 * @returns 500 - Registration failed
 */

router.post("/register", authController.register);

/**
 * @route POST /auth/login
 * @summary User login
 * @body {LoginInput} 200 - Login input
 * @returns {string} 200 - Login successful - application/json
 * @returns 300 - Invalid credentials
 * @returns 500 - Server error
 */

router.post("/login", authController.login);

module.exports = router;
