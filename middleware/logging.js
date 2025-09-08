const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('-------------------------');
    console.log(req.method, req.originalUrl);
    console.log('Session:', req.session?.id || 'No session');
    console.log('User:', req.user?.email || 'Not logged in');
    console.log('-------------------------');
  }
  next();
};

module.exports = { requestLogger };
