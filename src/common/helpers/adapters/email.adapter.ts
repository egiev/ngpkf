/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailPort } from '@/common/helpers/ports';

@Injectable()
export class EmailAdapter implements EmailPort {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SENDER_HOST,
      port: process.env.EMAIL_SENDER_PORT ? +process.env.EMAIL_SENDER_PORT : 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_SENDER_USERNAME,
        pass: process.env.EMAIL_SENDER_PASSWORD,
      },
    });
  }

  async send(options: nodemailer.SendMailOptions) {
    try {
      await this.transporter.sendMail(options);
    } catch {
      throw new Error("Can't send an email.");
    }
  }
}
