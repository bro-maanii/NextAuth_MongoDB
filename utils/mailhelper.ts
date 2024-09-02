import User from '@/models/Users/Usermodel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
export const sendMail = async (to: string, subject: string, userId:any) => {
    try {
        // step 3
        const hashToken = await bcrypt.hash(userId.toString(), 10);
        if (subject === 'VERIFY') {
            // update the user with the verification token and expiry
            const user = await User.findByIdAndUpdate(userId, 
               { $set: {verificationToken: hashToken, verificationTokenExpiry: Date.now() + 2*3600000}});
        }else if(subject === 'RESET'){
            // update the user with the forgot password token and expiry
            const user = await User.findByIdAndUpdate(userId,{ $set: {forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 3600000}});
        }
        // step 1
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 2525,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
          });
        //   step 2
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: subject==='VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<b>Click on the link to ${subject==='VERIFY' ? 'verify your email' : 'reset your password'}: <a href="${process.env.Domain}/${subject.toLowerCase()}?token=${hashToken}">Click here</a></b>
            <p>This link is valid for ${subject==='VERIFY' ? '2 hours' : '1 hour'}</p>
            <p>Or copy and paste the link below in your browser:</p>
            <p>${process.env.Domain}/${subject.toLowerCase()}?token=${hashToken}</p>
            <p>Thank you</p>
            <p>Team</p>`
        });
        console.log('Message sent: %s', info.messageId);
        return info;
        
    } catch (error) {
        // step 0
        console.error('Error occurred while sending the email:', error);
        throw error;
    }
}