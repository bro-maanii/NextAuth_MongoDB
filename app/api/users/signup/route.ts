import connectToDB from '@/utils/db_connect'
import User from '@/models/Users/Usermodel';
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import {sendMail} from '@/utils/mailhelper'

// Connect to the database before running the API route handlers 
// (Always Connect to DB before defining API routes)
connectToDB();

export async function POST(req: NextRequest) {
    try {
        const {name, email, password } = await req.json();
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' , success: false});
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({name, email, password: hashedPassword});
        const savedUser= await user.save();
        console.log(savedUser);
        // verify email and send verification email
        await sendMail(email, 'VERIFY', savedUser._id);
        return NextResponse.json({ message: 'User created successfully' , success: true , user: savedUser});
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        throw error;
    }
}