import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide your name"],
    },
    email:{
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please provide your password"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date,
    },
    
    });

// mongoose.models.User is an existing model in the Mongoose library. It checks if the User model already exists.
// mongoose.model("User", userSchema) is a function call that creates a new model named "User" using the userSchema 
// schema. If the User model does not exist, this line of code will create it.
const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;