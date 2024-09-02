import connectToDB from '@/utils/db_connect'
import User from '@/models/Users/Usermodel';
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';

connectToDB();

export async function POST(req: NextRequest) {
    try {
        // Get token from cookies
        // If token is not found, return 401 status code
        // If token is found, decode it and find user by id
        // If user is not found, return 404 status code
        // If user is found, return user data with 200 status code
        const token = req.cookies.get('token')?.value || "";
        if(!token){
            return NextResponse.json({ msg: 'No Token Found' }, { status: 401 });
        }
        const decoded : any = jwt.verify(token, process.env.hashSecret!);
        // decoded returns {userId: 'id'}(real token)
        // {userId: user._id}(real token)
        const user = await User.findOne({_id:decoded.userId}).select('-password');
        if(!user){
            return NextResponse.json({ msg: 'No User Found' }, { status: 404 });
        }
        return NextResponse.json({ user: user }, { status: 200 });
    
    } catch (error: any) {
        return NextResponse.json({ msg: 'Server Error' + error}, { status: 500 });
    }
}