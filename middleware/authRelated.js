// Make user available to templates
const attachUser = (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
};

// Require authentication
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/sign-up');
};

// Require membership
const requireMember = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user.is_member) {
    return next();
  }
  res.redirect('/auth/join-club');
};

// Require admin
const requireAdmin = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user.is_admin) {
    return next();
  }
  res.status(403).render('error', { message: 'Admin access required' });
};

module.exports = { attachUser, requireAuth, requireMember, requireAdmin };
