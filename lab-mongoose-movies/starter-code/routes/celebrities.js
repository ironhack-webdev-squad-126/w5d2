const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.post('/celebrities/:_id', (req, res, next) => {
  const _id = req.params._id;
  const { name, occupation, catchPhrase } = req.body;
  const dataToUpdate = {
    name,
    occupation,
    catchPhrase
  };
  Celebrity.findOneAndUpdate({ _id: _id }, dataToUpdate)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.error('Error while updating celebrity', err);
      next();
    });
});

router.get('/celebrities/:_id/edit', (req, res, next) => {
  Celebrity.findOne({ _id: req.params._id })
    .then(celebrity => {
      res.render('celebrities/edit', celebrity);
    })
    .catch(err => {
      console.error('Error while getting celebrity');
      next();
    });
});

router.post('/celebrities/:celebrityId/delete', (req, res, next) => {
  const celebrityId = req.params.celebrityId;
  Celebrity.findOneAndDelete({ _id: celebrityId })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.error('Error while deleting celebrity', err);
      next();
    });
});

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const celebrity = {
    name,
    occupation,
    catchPhrase
  };
  Celebrity.create(celebrity)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      res.render('celebrities/new');
    });
});

router.get('/celebrities/:_id', (req, res, next) => {
  const { _id } = req.params;
  Celebrity.findOne({ _id })
    .then(celebrity => {
      res.render('celebrities/show', { celebrity });
    })
    .catch(err => {
      console.error('Error while getting the celebrity');
      next();
    });
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
    .then(celebrities => {
      res.render('celebrities/index', { celebrities });
    })
    .catch(err => {
      console.error('Error while getting the celebrities list');
      next();
    });
});

module.exports = router;
