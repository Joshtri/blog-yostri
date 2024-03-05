import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            // Tambahkan opsi timeout di sini (misalnya, 30 detik)
            serverSelectionTimeoutMS: 500000,
        });

        console.log(`Database connected. ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;
