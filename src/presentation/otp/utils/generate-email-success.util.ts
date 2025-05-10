import { SendMailOptions } from 'nodemailer';

export const generateSuccessEmailMessage = (
  recipientEmail: string,
  results: any[],
): SendMailOptions => {
  const files = results.map(
    (file) =>
      `<li><a href="http://localhost/files/${file.filename}?token=valid-token">${file.filename}</a></li>`,
  );
  return {
    from: 'sample',
    to: 'reginaldventura23@gmail.com',
    subject: 'Online Results',
    html: `<p>Hello,</p>
    <p>Here are your files:</p>
    <ul>
      ${files}
    </ul>
    <p>If you did not request this, please ignore this message.</p>
    <p>Thank you,<br/>The Medical City</p>`,
  };
};
