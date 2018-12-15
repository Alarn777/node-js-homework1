var querystring = require('querystring');
let mongoose = require('mongoose');
let Player = require('./user.js');
let consts = require('./user_data/user_data.js');
var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');

const {MLAB_URL,DB_USER,DB_PASS} = consts;
const url = MLAB_URL;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    user : DB_USER,
    pass : DB_PASS
};

function runServer () {
    app.use(express.json());       // to support JSON-encoded bodies
    app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get('/',function(req,res){

        app.use(express.static("includes"));
        res.sendFile(path.join(__dirname + '/includes/index.html'));
    });

    app.get('/GetAllPunishments', (req, res) => {
        mongoose
            .connect(url,options)
            .then(() => {
                console.log('connected to Mongo');
                Player.find({}, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    res.json(result);
                    mongoose.disconnect();
                    res.end()
                });
            })
            .catch(err => {
                return console.error("Database Error!", err);
            });
    });

    app.post('/GetPunishedById', (req, res) => {

        const idValue = req.body.id;

        mongoose
            .connect(url,options)
            .then((idValue) => {
                console.log('connected to Mongo');
                Player.find({id: Id}, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    res.json(result);
                    mongoose.disconnect();
                    res.end()
                });
            })
            .catch(err => {
                return console.error("Database Error!", err);
            });
    });


    app.post('/GetPunishedByCardSAndReason', (req, res) => {

        const postBody = req.body;

        mongoose
            .connect(url,options)
            .then((idValue) => {
                console.log('connected to Mongo');
                Player.find({reasons: req.body.reasons,cards: req.body.cards }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    res.json(result);
                    mongoose.disconnect();
                    res.end()
                });
            })
            .catch(err => {
                return console.error("Database Error!", err);
            });
    });



    app.get('/GetPunishedByCardSAndReason', (req, res) => {

        // let idValue = req.query.id;
        // console.log(idValue);

        mongoose
            .connect(url,options)
            .then((idValue) => {
                console.log('connected to Mongo');

                let reasons = "";
                let cards = "";
                if(req.query.reasons === undefined && req.query.cards === undefined) {
                    cards = "Yellow";
                    reasons = "Takle";
                }
                else{
                    cards = req.query.cards;
                    reasons = req.query.reasons;
                }


                Player.find({reasons: reasons,cards: cards }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    res.json(result);
                    mongoose.disconnect();
                    res.end()
                });
            })
            .catch(err => {
                return console.error("Database Error!", err);
            });
    });





    app.listen(process.env.PORT || 3000);
}

runServer();