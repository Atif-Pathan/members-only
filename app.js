require('dotenv').config();

const path = require('node:path');
const express = require('express');

// Import configurations
const sessionConfig = require('./config/session');
const passport = require('./config/passport');

// Import middleware
const { requestLogger } = require('./middleware/logging');
const { attachUser } = require('./middleware/authRelated');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Import routes
// const indexRouter = require('./src/routes/index');
const authRouter = require('./routes/authRoutes');
// const messageRouter = require('./src/routes/messages');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRouter);

// session

app.get('/', (req, res, next) => {
  res.send('<h1>Hello World</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
