// config.js
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'travlr_change_this_secret_in_real_apps',
  jwtExpiresInDays: 7
};
