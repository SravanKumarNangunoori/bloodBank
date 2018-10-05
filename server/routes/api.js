const express = require('express');
const router = express.Router();


// declare mongo db credentials for making http requests
const mongojs = require('mongojs');
const db = mongojs('mongodb://user:mypassword@ds137040.mlab.com:37040/capillary',['gamelist']);


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
     db.gamelist.find(function(err, docs) {
        res.send(docs);
    });

 
});

module.exports = router;