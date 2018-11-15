const express = require('express');
const router = express.Router();


// declare mongo db credentials for making http requests
const mongojs = require('mongojs');
const userdb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').userdb;
const hospitaldb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').hospitaldb;
const bloodbankdb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').bloodbankdb;
const registeredUserdb = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').registeredUsers;
const emergency1 = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').emergency1;
// const tempUser = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').hospitalTemp;
// const bloodbankTemp = mongojs('mongodb://team6user:team6password@ds125673.mlab.com:25673/bloodbank').bloodBanktemp;



/* GET api listing. */
router.get('/bloodbank', (req, res) => {
    emergency1.find(function(err, docs) {
        res.send(docs);
    });
});


router.get('/hospital', (req, res) => {
    console.log('called');
    bloodbankdb.find(function(err, docs) {
        res.send(docs);
    });
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

router.post('/postuser', (req, res) => {
    userdb.insert(req.body, function(err, doc) {
        console.log(doc);
        console.log("Successfully Added")
        if (err) throw err;
        res.send(doc);
    });
});


// router.get('/singleUser', (req, res) => {
//     userdb.find({ "email": req.body.email }, (function(err, docs) {
//         res.send(docs);
//     }))
// });
router.post('/registerUser', (req, res) => {
    registeredUserdb.insert(req.body, function(err, doc) {
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
router.post('/posthospital', (req, res) => {
    hospitaldb.insert(req.body, function(err, doc) {
        console.log(doc);
        console.log("Successfully Added in hospital database")
        if (err) throw err;
        res.send(doc);
    })
});

router.post('/hospital',(req,res)=>{
    console.log(req.body)
    emergency1.insert(req.body,function(err, doc) {
             console.log(doc);
             console.log("Successfully Added")
             if (err) throw err;
             res.send(doc);
  });
  });


//update hospital
router.post('/updatehospital', (req, res) => {
    var id = req.body._id;
    hospitaldb.remove({ "_id": mongojs.ObjectId(id) });
    let newObj = req.body;
    delete(newObj._id);
    hospitaldb.insert(newObj, function(err, doc) {
        if (err) throw err;
        res.send(doc);

    })

});

router.post('/deleteall', (req, res) => {
    hospitaldb.remove({});
    res.send({ 'status': 'success' });
});

router.post('/postbloodbank', (req, res) => {
    bloodbankdb.insert(req.body, function(err, doc) {
        console.log(doc);
        console.log("Successfully Added in bloodbank")
        if (err) throw err;
        res.send(doc);
    });


});

router.post('/updateUser', (req, res) => {
    var id = req.body._id;
    userdb.remove({ "email": req.body.email });
    setTimeout(() => {
        let newObj = req.body;
        delete(newObj._id);
        userdb.insert(newObj, function(err, doc) {
            if (err) throw err;
            res.send(doc);
        })
    }, 4000)

});


router.post('/updatebloodbank', (req, res) => {
    var id = req.body._id;
    bloodbankdb.remove({ "email": req.body.email });
    setTimeout(() => {
        let newObj = req.body;
        delete(newObj._id);
        bloodbankdb.insert(newObj, function(err, doc) {
            if (err) throw err;
            res.send(doc);
        })
    }, 4000)

});

module.exports = router;