// database/config.js
import mongoose from 'mongoose';

export default async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Detener el proceso en caso de error
    }
}
