import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the provided MongoDB connection string.
 * This function establishes a connection to the MongoDB database using the `MONGODB_URI` environment variable.
 * It uses the `mongoose` library to connect to the database and handles the connection events.
 * If the connection is successful, it logs a message indicating that the database is connected.
 * If the connection fails, it logs an error message and exits the application.
 * 
 */
async function connectToDB() {
    const uri = process.env.MONGODB_URI; // Replace with your MongoDB connection string
    try {
        // db connection
        mongoose.connect(uri!)
        // Event listeners
        const connection = mongoose.connection;
        // Event listener for successful connection
        connection.on('connected', () => {
            console.log('Database connected');
        });
        // Event listener for connection error
        connection.on('error', (err) => {
            console.log('Connection failed: '+ err);
            // Close the application
            process.exit();
        });

    } catch (error) {
        console.error('Failed to connect to the database:', error);
        throw error;
    }
}

export default connectToDB;