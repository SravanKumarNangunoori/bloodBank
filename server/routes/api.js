const express = require('express');
const router = express.Router();


// declare mongo db credentials for making http requests
const mongojs = require('mongojs');
const userdb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').userdb;

const hospitaldb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').hospitaldb;

const bloodbankdb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').bloodbankdb;


const registeredUserdb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').registeredUsers ;
const tempUser = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').hospitalTemp  ;



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

  console.log('called');
  hospitaldb.find(function(err, docs) {
        res.send(docs);
    }); 
});
// Get all bloodbank collection
router.get('/bloodbankcollection', (req, res) => {
  console.log('called');
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


// router.post('/postname',(req,res)=>{
//   userdb.insert(req.body,function(err, doc) {
//            console.log(doc);
//            console.log("Successfully Added")
//            if (err) throw err;
//            res.send(doc);
// });
// });
router.post('/registerUser',(req,res)=>{
  registeredUserdb.insert(req.body,function(err, doc) {
           console.log(doc);
           if (err) throw err;
           res.send(doc);
});
});
router.get('/registeredUsers', (req, res) => {
  registeredUserdb.find(function(err, docs) {
        res.send(docs);
    }); 
});
router.post('/posthospital',(req,res)=>{
  tempUser.insert(req.body,function(err, doc) {
           console.log(doc);
           console.log("Successfully Added in hospital database")
           if (err) throw err;
           res.send(doc);
});
});

router.post('/updatehospital', (req,res)=>{
  var id = req.body.id;
  var name = req.body.name;
  var address = req.body.address;
  var apos = req.body.apos;
  var aminus = req.body.aminus;
  var bpos = req.body.bpos;
  var bminus = req.body.bminus;
  var abpos = req.body.abpos;
  var abminus = req.body.abminus;
  var opos = req.body.opos;
  var ominus = req.body.ominus;
  console.log(req.body);
  hospitaldb.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: { $set: {
      Name:name,
      Address:address,
      Apos:apos,
      Aminus:aminus,
      Bpos:bpos,
      Bminus:bminus,
      ABpos:abpos,
      ABminus:abminus,
      Opos:opos,
      Ominus:ominus
    } }
  }, function(err, doc){
    if(err) throw err;
    console.log(doc);
    res.send({'status': 'succes'});
  });
  return;
  hospitaldb.update({_id:mongojs.ObjectId(id)},{ $set:{
      Name:name,
      Address:address,
      Apos:apos,
      Aminus:aminus,
      Bpos:bpos,
      Bminus:bminus,
      ABpos:abpos,
      ABminus:abminus,
      Opos:opos,
      Ominus:ominus
    }}, (err, a)=>{
      if(err) throw err;
      res.send({status:'success'});
    });
});

router.post('/deleteall', (req, res)=>{
  hospitaldb.remove({});
  res.send({'status':'success'});
});

router.post('/postbloodbank',(req,res)=>{
  bloodbankdb.insert(req.body,function(err, doc) {
           console.log(doc);
           console.log("Successfully Added in bloodbank")
           if (err) throw err;
           res.send(doc);
});

router.post('/updatebloodbank', (req,res)=>{
  var id = req.body.id;
  var name = req.body.name;
  var address = req.body.address;
  var apos = req.body.apos;
  var aminus = req.body.aminus;
  var bpos = req.body.bpos;
  var bminus = req.body.bminus;
  var abpos = req.body.abpos;
  var abminus = req.body.abminus;
  var opos = req.body.opos;
  var ominus = req.body.ominus;
  console.log(req.body);
  bloodbankdb.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: { $set: {
      Name:name,
      Address:address,
      Apos:apos,
      Aminus:aminus,
      Bpos:bpos,
      Bminus:bminus,
      ABpos:abpos,
      ABminus:abminus,
      Opos:opos,
      Ominus:ominus
    } }
  }, function(err, doc){
    if(err) throw err;
    console.log(doc);
    res.send({'status': 'successss'});
  });
  return;
  bloodbankdb.update({_id:mongojs.ObjectId(id)},{ $set:{
      Name:name,
      Address:address,
      Apos:apos,
      Aminus:aminus,
      Bpos:bpos,
      Bminus:bminus,
      ABpos:abpos,
      ABminus:abminus,
      Opos:opos,
      Ominus:ominus
    }}, (err, a)=>{
      if(err) throw err;
      res.send({status:'success'});
    });
});

});


module.exports = router;
