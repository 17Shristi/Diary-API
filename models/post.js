import mongoose from 'mongoose';

const Post = new mongoose.Schema({
    date: {type : Date, required: true, default: Date.now},
    title: {type : String, required: true},
    content: {type : String, required: true},
}, {
    collection : 'posts',
    timestamps: true
});



export default mongoose.model('Post', Post);