import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import validator from 'validator';

const User = new mongoose.Schema({
    email: {type : String, required: true, unique: true},
    password: {type : String, required: true},
}, {
    collection : 'users',
    timestamps: true
});

//signup
User.statics.signup = async function(email,password) {
    if(!email || !password) throw Error('All Fields Required');
   
    if(!validator.isEmail(email)) throw Error('Invalid email');
    if(!validator.isStrongPassword(password)) throw Error('Password is not strong enough');

    const exits = await this.findOne({email});
    if(exits) throw Error('Email already registered');

    const salt = await bcrypt.genSalt(10);
    const hash  = await bcrypt.hash(password, salt);

    const user  = await this.create({email,password: hash});

    return user;
}

//login

User.statics.login = async function(email,password) {
    if(!email || !password) throw Error('All Fields Required');
    
    const user = await this.findOne({email});
    if(!user) throw Error('email not registered');

    const match  = await bcrypt.compare(password, user.password);

    if(!match) throw Error('Incorrect Password');

    return user;
}



export default mongoose.model('User', User);