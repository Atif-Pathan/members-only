const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authRelated');

const authRouter = Router();

// Sign up routes
authRouter.get('/sign-up', authController.getSignUp);
authRouter.post('/sign-up', authController.signUpUser);

// Login routes
authRouter.get('/login', authController.getLogin);
authRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: false,
  }),
);

// Join club routes (requires authentication)
authRouter.get('/join-club', requireAuth, authController.getJoinClub);
// authRouter.post('/join-club', requireAuth, authController.joinClub);

// Logout
authRouter.get('/log-out', authController.logout);

module.exports = authRouter;
