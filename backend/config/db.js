import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected");
    } catch (e) {
        console.log("error");
        process.exit();
    }
}
export default connectDB;