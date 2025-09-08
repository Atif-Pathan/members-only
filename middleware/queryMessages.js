// This middleware checks for specific query parameters and makes them available to all EJS templates.
const queryMessages = (req, res, next) => {
  // Get the message from the URL query, if it exists
  const message = req.query.message;

  if (message) {
    // Add it to `res.locals`. Anything in `res.locals` is automatically
    // available as a variable in your EJS views.
    res.locals.message = message;
  }

  next(); // Pass control to the next middleware
};

module.exports = { queryMessages };
