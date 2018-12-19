var querystring = require('querystring');
let mongoose = require('mongoose');
let Player = require('./user.js');
let consts = require('./user_data/user_data.js');
var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
const func = require("./functions.js");

const {MLAB_URL,DB_USER,DB_PASS} = consts;


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
        func.GetAllPunishments().then((result) => {
            res.json(result);

        }, (error) => {
            console.log(error);


        });
    });

    app.post('/SetGamesToSkipById', (req, res) => {

        let id = 0;
        let gamesToSkip = 0;
        if(req.body.id === undefined && req.body.gamesToSkip === undefined) {
            id = 5;
            gamesToSkip = 100;
        }
        else{
            id = req.body.id;
            gamesToSkip = req.body.gamesToSkip;
        }


        func.SetPunishedById(id, gamesToSkip).then((result) => {
            res.json(result);

        }, (error) => {
            console.log(error);
        });

    });


    app.post('/GetPunishedByCardSAndReason', (req, res) => {




        func.GetPunishedByCardSAndReason(req.body.cards,req.body.reasons).then( (result) => {
            res.json(result);

        }, (error) =>{
            console.log(error);
        });
    });



    app.get('/GetPunishedByCardSAndReason', (req, res) => {

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



        func.GetPunishedByCardSAndReason(cards,reasons).then( (result) => {
            res.json(result);

        }, (error) =>{
            console.log(error);
        });

    });





    app.listen(process.env.PORT || 3000);
}

runServer();