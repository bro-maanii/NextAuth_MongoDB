import connectToDB from '@/utils/db_connect'
import User from '@/models/Users/Usermodel';
import { NextRequest, NextResponse } from 'next/server'

connectToDB();

export async function POST(req: NextRequest) {
    try {
        const response = NextResponse.json({message:"User Successfully Logged Out" , success: true });
        response.cookies.set('token', '', {httpOnly: true});
        return response;
        
    } catch (error) {
        return NextResponse.json({ error: 'Failed to Logout' , success: false });
    }
}