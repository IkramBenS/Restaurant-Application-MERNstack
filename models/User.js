const mongoose = require('mongoose'); //bring up mongoose

const UserSchema = new mongoose.Schema( //create new instance : usershema
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0, //if the role of the user signed up =0 ===> user if role =1 ==> admin user
        },                  
    },
    { timestamps: true}
);
const User = mongoose.model('User', UserSchema);
module.exports = User;