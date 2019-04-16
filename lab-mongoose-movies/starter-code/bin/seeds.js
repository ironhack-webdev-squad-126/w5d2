const Celebrity = require('../models/celebrity');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/starter-code');

const celebrities = [
  {
    name: 'Alina',
    occupation: 'Student',
    catchPhrase: 'I will do it!'
  },
  {
    name: 'Helleke',
    occupation: 'Student',
    catchPhrase: 'The End is coming!'
  },
  {
    name: 'Julia',
    occupation: 'professional dancer',
    catchPhrase: 'What the heck?!'
  }
];

Celebrity.create(celebrities)
  .then(data => {
    console.log(`Created ${data.length} celebrities!`);
  })
  .catch(err => {
    console.error('Error while seeding the database', err);
  });
