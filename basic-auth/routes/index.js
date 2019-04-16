const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  User.create({ username, password })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.error('Error while registering new user', err);
      next();
    });
});

module.exports = router;
