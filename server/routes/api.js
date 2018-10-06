const express = require('express');
const router = express.Router();


// declare mongo db credentials for making http requests
const mongojs = require('mongojs');
const userdb = mongojs('mongodb://bloodbankuser:team6password@ds113670.mlab.com:13670/bloodbankmanager').user;

const hospitaldb = mongojs('mongodb://bloodbankuser:team6password@ds113670.mlab.com:13670/bloodbankmanager').hospital;

const bloodbankdb = mongojs('mongodb://bloodbankuser:team6password@ds113670.mlab.com:13670/bloodbankmanager').bloodBank;


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all user collection
router.get('/usercollection', (req, res) => {
  userdb.find(function(err, docs) {
        res.send(docs);
    }); 
});
// Get all hospital collection
router.get('/hospitalcollection', (req, res) => {
  hospitaldb.find(function(err, docs) {
        res.send(docs);
    }); 
});
// Get all bloodbank collection
router.get('/bloodbankcollection', (req, res) => {
  bloodbankdb.find(function(err, docs) {
        res.send(docs);
    }); 
});

module.exports = router;