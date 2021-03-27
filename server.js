// require environment modules npm
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// require project modules
const router = require('./app/routes');
const csrfProtection = require('./app/middlewares/csrf');

// express server creation
const app = express();

// middlewares
app.use(morgan('tiny')); // logging
app.use( express.urlencoded({extended: true}) ); // body parser
app.use(express.json()); // read json data
app.use(cookieParser()); // cookie parser

// authorize data echange between different websites
app.use(cors('*'));

// middleware for CSRF token creation and validation
app.use(csrfProtection);

// error handler for CSFR token
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  res.status(403).json({
    error: "security violation - invalid CSRF token"
  });
})

// configure routes
app.get('/api', (_, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
    <div style="margin: 5em auto; width: 400px; line-height: 1.5">
      <h1 style="text-align: center">Hello!</h1>
      <p>Si tu vois ce message, c'est que tu es sur bien l'API tuy'O !</p>
      </ul>
    </div>
    `);
})

app.use('/api', router);

// start server on port
const PORT = process.env.PORT || 5000;
app.listen(PORT || 3000, () => {
    console.log(`API is ready on PORT: ${PORT}`)
});