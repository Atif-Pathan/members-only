require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');

// Import configurations
const sessionConfig = require('./config/session');
require('./config/passport');
const passport = require('passport');

// Import middleware
const { requestLogger } = require('./middleware/logging');
const { attachUser } = require('./middleware/authRelated');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { queryMessages } = require('./middleware/queryMessages');

// Import routes
const indexRouter = require('./routes/indexRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Static files
app.use(express.urlencoded({ extended: false }));

// session config
app.use(session(sessionConfig));

// Passport config
app.use(passport.session());

// Custom middlewares
app.use(requestLogger);
app.use(queryMessages);
app.use(attachUser);

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
