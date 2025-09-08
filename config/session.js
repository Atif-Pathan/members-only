const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./pool');

const sessionConfig = {
  store: new pgSession({
    pool: pool,
    tableName: process.env.SESSION_TABLE_NAME || 'session',
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    secure: process.env.NODE_ENV === 'production' && process.env.SECURE_COOKIES === 'true',
    httpOnly: true,
    sameSite: 'lax',
  },
};

module.exports = sessionConfig;
