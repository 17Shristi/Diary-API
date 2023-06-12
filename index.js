import express from "express";
import * as dotenv from 'dotenv';
import mongoose from "mongoose";

import postRoutes from './routes/postRoutes.js'

dotenv.config();
const port  = process.env.PORT;

const app = express();
app.use(express.json());

app.use('/api/posts', postRoutes)

app.get('/',(req,res) => {
    res.send('Hello world!')
})

const connectDB = async () => {
    try {
        mongoose.set('strictQuery',true)
        mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('MongoDB Connected')

    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}



connectDB().then(() => {
    app.listen(port, ()=> console.log(`listening on port ${port}`));
}).catch(error => console.log(error));


