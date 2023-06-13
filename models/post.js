import mongoose, { Schema } from 'mongoose';

const Post = new mongoose.Schema({
    date: {type : Date, required: true, default: Date.now},
    title: {type : String, required: true},
    content: {type : String, required: true},
    user_id: {type:Schema.Types.ObjectId,
    ref: 'user'}
}, {
    collection : 'posts',
    timestamps: true
});



export default mongoose.model('Post', Post);