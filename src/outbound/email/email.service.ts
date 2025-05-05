import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async send(options: nodemailer.SendMailOptions) {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SENDER_SERVICE,
        auth: {
          user: process.env.EMAIL_SENDER_USERNAME,
          pass: process.env.EMAIL_SENDER_PASSWORD,
        },
      });

      await transporter.sendMail(options);
    } catch (e) {
      console.log(e);
      console.log("Can't send an email.");
    }
  }
}
