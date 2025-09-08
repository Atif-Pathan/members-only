const notFound = (req, res, next) => {
  res.status(404).render('error', { message: 'Page not found' });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
  });
};

module.exports = { notFound, errorHandler };
