let mongoose = require('mongoose');

const schema = {
    name: { type: String, index:1 },
    age: Number,
    status: { type: String, required:true },
    group: [ String ]
};
const user_schema = new mongoose.Schema(schema);
const User = mongoose.model('User',user_schema);


//
// console.log(`required paths: ${user_schema.requiredPaths()}`);
// console.log(`indexes: ${JSON.stringify(user_schema.indexes())}`);

module.exports = User;