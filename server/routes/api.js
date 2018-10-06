const express = require('express');
const router = express.Router();


// declare mongo db credentials for making http requests
const mongojs = require('mongojs');
const userdb = mongojs('mongodb://bloodbankuser:team6password@ds113670.mlab.com:13670/bloodbankmanager',['user']);

const hospitaldb = mongojs('mongodb://bloodbankuser:team6password@ds113670.mlab.com:13670/bloodbankmanager',['hospital']);

const bloodbankdb = mongojs('mongodb://bloodbankuser:team6password@ds113670.mlab.com:13670/bloodbankmanager',['bloodBank']);


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  userdb.gamelist.find(function(err, docs) {
        res.send(docs);
    });

 
});

module.exports = router;