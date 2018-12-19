const Player = require('./user.js'),
      mongoose = require('mongoose'),
      consts = require('./user_data/user_data.js');

mongoose.Promise = global.Promise;

const {MLAB_URL,DB_USER,DB_PASS} = consts;
const url = MLAB_URL;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    user : DB_USER,
    pass : DB_PASS
};
const connection = mongoose.connection;//get default connection

mongoose.connect(url,options);




exports.GetAllPunishments = () => {
    return new Promise( (resolve, reject ) => {
        Player.find({},
            (err, data) => {
                if(err)
                    reject(`error: ${err}`);

                resolve(data);
            }
        )
    });
};



exports.SetPunishedById = (id,gamesToSkip) => {
    return new Promise( (resolve, reject ) => {
        Player.findOne({id: id}, function(err, teamData){
            if(teamData){
                teamData.$set("gamesToSkip",gamesToSkip);
                teamData.save(function(err) {
                    if (err)
                        console.log(err);
                        });


                resolve(teamData);
            }else{
                reject(`error: ${err}`);
                console.log(err);
            }
        })
    })
};


exports.GetPunishedByCardSAndReason = (card,reason) => {
    return new Promise( (resolve, reject ) => {
        Player.find({reasons: reason, cards: card}, (err, result) => {
            if (err)
                reject(`error: ${err}`);
            // console.log(result);
            resolve(result);
        })
    })
};

exports.error = () => {
    return `<!DOCTYPE html>
                <html lang="en">
					<head>
					<title>Database connection error</title>
					</head>
					<body>
					<div style="font-size: 20px; text-align: right;"><p>Not Found!</p></div>
					<div style="text-align: right;"><p>Unable to fetch the document you requested</p></div>
					</body>
					</html>
					`;
};



connection.on('error',
    (err) => {
        console.log(`connection error: ${err}`);
    }
);