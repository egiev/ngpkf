import { SendMailOptions } from 'nodemailer';

export const generateOtpEmailMessage = (
  recipientEmail: string,
  otp: string,
): SendMailOptions => {
  return {
    from: 'sample',
    to: recipientEmail,
    subject: 'Your One-Time Password (OTP) for Verification',
    text: `Hello,
  
    Your One-Time Password (OTP) is: ${otp}
    
    This code will expire in 5 minutes. Please do not share this code with anyone.
    
    If you did not request this, please ignore this message.
    
    Thank you,
    The MyApp Team`,
    html: `<p>Hello,</p>
    <p>Your <strong>One-Time Password (OTP)</strong> is: <b>${otp}</b></p>
    <p>This code will expire in <strong>5 minutes</strong>. Please do not share it with anyone.</p>
    <p>If you did not request this, please ignore this message.</p>
    <p>Thank you,<br/>The <strong>MyApp</strong> Team</p>`,
  };
};
