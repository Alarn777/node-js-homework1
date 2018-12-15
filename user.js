let mongoose = require('mongoose');

const schema = {
    id: Number,
    name: { type: String, index:1,required: true},
    age: Number,
    team: String,
    position: String,
    gamesToSkip: Number,
    cards: [ String ],
    reasons: [ String ]


};
const user_schema = new mongoose.Schema(schema);
const Player = mongoose.model('punished_sportsman',user_schema);


module.exports = Player;