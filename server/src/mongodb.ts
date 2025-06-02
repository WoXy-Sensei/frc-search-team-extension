import mongoose from 'mongoose';

const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(process.env.ATLAS_URI || '');
};

export default connectToDatabase;
