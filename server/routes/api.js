const express = require('express');
const router = express.Router();


// declare mongo db credentials for making http requests
const mongojs = require('mongojs');
const userdb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').userdb;

const hospitaldb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').hospitaldb;

const bloodbankdb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').bloodbankdb;


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

router.post('/postuser',(req,res)=>{
  userdb.insert(req.body,function(err, doc) {
           console.log(doc);
           console.log("Successfully Added")
           if (err) throw err;
           res.send(doc);
});
});

router.post('/postname',(req,res)=>{
  userdb.insert(req.body,function(err, doc) {
           console.log(doc);
           console.log("Successfully Added")
           if (err) throw err;
           res.send(doc);
});
});


router.post('http://localhost:3000/api/usercollection',(req,res)=>{
  userdb.insert(req.body,function(err, doc) {
           console.log(doc);
           console.log("Successfully Added")
           if (err) throw err;
           res.send(doc);
});
});


module.exports = router;