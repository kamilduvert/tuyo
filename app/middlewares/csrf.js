const csrf = require('csurf');

const csrfProtection = csrf({
    cookie: {
        key: '_csrf-tuyo', // name in cookies
        httpOnly: true, // not readable by JS
        secure: process.env.NODE_ENV === 'production', // only with https
        maxAge: 3600 // expire in 1h
    }
  });

module.exports = csrfProtection;