import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('app connected successfully!!');
    } catch (error) {
        console.log('the connection failed!! ' + error.message);
    }
};