import connectToDB from '@/utils/db_connect'
import User from '@/models/Users/Usermodel';
import { NextRequest, NextResponse } from 'next/server'

connectToDB();

export async function POST(req: NextRequest) {
    try {
        const {token} = await req.json();
        const user = await User.findOne({verificationToken: token , verificationTokenExpiry: { $gt: Date.now() }});
        if(!user){
            return NextResponse.json({ error: 'Invalid or expired token' , success: false });
        }
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        user.isVerified = true;
        await user.save();
        return NextResponse.json({message:"User Successfully Verified" , success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to verify' , success: false });
    }
}