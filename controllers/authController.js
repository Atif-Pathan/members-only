const bcrypt = require('bcryptjs');
const userQueries = require('../queries/userQueries');
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('first_name', 'First name must be 1–100 characters.').trim().notEmpty().isLength({ min: 1, max: 100 }),
  body('last_name', 'Last name must be 1–100 characters.').trim().notEmpty().isLength({ min: 1, max: 100 }),
  body('email', 'Not a valid email').trim().notEmpty().isEmail(),
  // Add password validation
  body('password').notEmpty().isLength({ min: 8 }),
  body('confirmPassword', 'Passwords must match.').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

// GET sign-up form
exports.getSignUp = (req, res) => {
  res.render('auth/sign-up', {
    title: 'Sign Up - Clubhouse',
  });
};

// POST sign-up form
exports.signUpUser = [
  ...validateUser,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      console.log(req.body);
      const { first_name, last_name, email, password } = req.body;

      if (!errors.isEmpty()) {
        // If there are errors, re-render the form with the data and errors
        return res.status(400).render('auth/sign-up', {
          title: 'Sign Up - Clubhouse',
          user: { first_name, last_name, email }, // Pass back submitted data
          errors: errors.array(),
        });
      }

      // Check if email already exists
      const existingUser = await userQueries.findByEmail(email);
      if (existingUser) {
        return res.status(400).render('auth/sign-up', {
          title: 'Sign Up - Clubhouse',
          user: { first_name, last_name, email },
          error: 'Email already registered',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const userData = {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      };

      const newUser = await userQueries.create(userData);

      console.log(`User created: ${newUser.first_name}`);

      // Redirect to login page with success message
      res.render('auth/log-in', {
        title: 'Log In - Clubhouse',
        success: 'Account created successfully! Please log in.',
      });
    } catch (error) {
      next(error);
    }
  },
];

// GET login form
exports.getLogin = (req, res) => {
  res.render('auth/login', {
    title: 'Log In - Clubhouse',
  });
};

// GET membership form
exports.getJoinClub = (req, res) => {
  res.render('auth/join-club', {
    title: 'Get Membership - Clubhouse',
  });
};

// GET Logout
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
