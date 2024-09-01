import connectToDB from '@/utils/db_connect'
import User from '@/models/Users/Usermodel';
import { NextRequest, NextResponse } from 'next/server'
import bycrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import next from 'next';

connectToDB();

export async function POST(req: NextRequest) {
    try {
        const {email, password} = await req.json();
        const user = await User.findOne({email});
        if(!user && !!user.isVerified){
            return NextResponse.json({ error: 'Invalid Credentials' , success: false });
        }
        console.log("User", user);
        // Check if password matches
        const isMatch = await bycrpt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({ error: 'Invalid Credentials' , success: false });
        }
        // craete token of JWT (Json Web Token) and send it to the user
        const token = jwt.sign({userId: user._id}, process.env.hashSecret!, {expiresIn: '2d'});
        const response = NextResponse.json({message:"User Successfully Logged In" , success: true });
        response.cookies.set('token', token, {httpOnly: true});
        return response;
        
    } catch (error) {
        return NextResponse.json({ error: 'Failed to Login' , success: false });
    }
}
