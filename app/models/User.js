const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true},
    reputation: { type: Number, required: true},
    type: { type: Number, required: true },
    aBoolean: { type: Boolean, required: false },
    logged: {type: Boolean, required: true }
});

//Create the user model
const UserModel = mongoose.model('User', UserSchema);

//Ensure that
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });

UserModel.findUserById = (userId, callback) => {
    UserModel.findById(userId, (err, data) => {
        if (err) return callback(err);
        return callback(null, data);
    })
}


UserModel.findUser = (email, callback) => {
    console.log("Request to find user " + email)
    UserModel.findOne({ 'email' : email }, (err, user) => {
        if (err) return callback(err);
        return callback(null, user);
    })
}

UserModel.findUserByUsername = (username, callback) => {
    console.log("Request to find user " + username)
    UserModel.findOne({ 'username' : username }, (err, user) => {
        if (err) return callback(err);
        return callback(null, user);
    })
}

UserModel.createUser = (userData, callback) => {
    const newUser = new UserModel(userData);
    newUser.save((err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

UserModel.updateUser = (userId, updateObj, callback) => {
    UserModel.findByIdAndUpdate(userId, updateObj, {new: true}, (err, user) => {
      if (err) return callback(err);
      return callback(null, user);
    })
}

//Export the user model
module.exports = UserModel;
