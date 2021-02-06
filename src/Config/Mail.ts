import SMTPTransport from 'nodemailer/lib/smtp-transport';

/* eslint-disable radix */
export const mailConfig: SMTPTransport.Options = {
  host: process.env.MAIL_HOST as string,
  port: parseInt(process.env.MAIL_PORT as string),
  secure: false,
  auth: {
    user: process.env.MAIL_USER as string,
    pass: process.env.MAIL_PASSWORD as string,
  },
};
