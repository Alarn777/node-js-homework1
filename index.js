
let mongoose = require('mongoose');
let User = require('./user.js');
let consts = require('/user_data/user_data.js');

const {MLAB_URL,DB_USER,DB_PASS} = consts;
const url = MLAB_URL;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    user : DB_USER,
    pass : DB_PASS
};

const user = new User({
    name: "Maga",
    age: 19,
    status: "A",
    groups: ["sports","music","books"]
});

mongoose
    .connect(url,options)
    .then(() => {
        console.log('connected to Mongo');
        // User.find({status:'A'}, (err, resoult) => {
        //     if (err) throw err;
        //     console.log(resoult);
        //     mongoose.disconnect();
        //
        //
        // })
        user.save((err) => {
            if (err)
                console.log(`err: ${err}`);
            else {
                console.log(`Saved docs: ${JSON.stringify(user)}`);
                mongoose.disconnect();
            }
        })

    })
    .catch(err => {
        return console.error("Some error!", err);
    });