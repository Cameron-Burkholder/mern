const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const transporter = require("../config/email.js");

const { log } = require("../config/utilities");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/User");

const saltRounds = 10;

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async function(request, response) {
  log("POST REQUEST AT /api/users/register");
  // Form validation
  const { errors, isValid } = validateRegisterInput(request.body);
  // Initialize response
  let packet = {
    status: ""
  };
  // Check validation
  if (!isValid) {
    packet.status = "INVALID_REGISTRATION";
    packet.errors = errors;
    return response.json(packet);
  }
  User.findOne({ email: request.body.email }).then(user => {
    if (user) {
      packet.status = "EXISTING_USER";
      return response.json(packet);
    } else {
      const newUser = new User({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password1
      });
      // Hash password before saving in database
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) {
            throw error;
          }
          newUser.password = hash;
          newUser.save().then(user => {
            packet.status = "USER_REGISTERED";
            response.json(packet);
            let emailOptions = {
              from: keys.EMAIL,
              to: request.body.email,
              subject: "Account Registration",
              text: "You've registered your account with the Guitar Practice Suite. Thanks!"
            };
            transporter.sendMail(emailOptions, (error, info) => {
              if (error) {
                console.log(error);
              }
            });
          }).catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async function(request, response) {
  log("POST REQUST AT /api/users/login");
  // Form validation
  const { errors, isValid } = validateLoginInput(request.body);
  // Initialize response
  let packet = {
    status: ""
  };
  // Check validation
  if (!isValid) {
    packet.status = "INVALID_LOGIN";
    packet.errors = errors;
    return response.json(packet);
  }
  const email = request.body.email;
  const password = request.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      packet.status = "EMAIL_NOT_FOUND";
      return response.json(packet);
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched

        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(payload, keys.JWT_SECRET, { expiresIn: Date.now() + 31556952000}, (error, token) => {
          packet.status = "VALID_LOGIN";
          packet.token = token;
          response.json(packet);
        });
      } else {
        packet.status = "INCORRECT_PASSWORD";
        return response.json(packet);
      }
    });
  });
});

module.exports = router;
