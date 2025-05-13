export function generateTOTPEmailMessage(to: string, totp: string) {
  return {
    from: 'sample',
    to,
    subject: 'Your One-Time Password (OTP) for Verification',
    html: `<p>Hello,</p>
        <p>Your <strong>One-Time Password (OTP)</strong> is: <b>${totp}</b></p>
        <p>This code will expire in <strong>5 minutes</strong>. Please do not share it with anyone.</p>
        <p>If you did not request this, please ignore this message.</p>
        <p>Thank you,<br/>The Medical City</p>`,
  };
}

export function generateResultsEmailMessage(
  to: string,
  token: string,
  results: string[] = [],
) {
  const files = results.map(
    (file) =>
      `<li><a href="http://localhost/files/${file}?token=${token}">${file}</a></li>`,
  );

  return {
    from: 'sample',
    to,
    subject: 'Online Results',
    html: `<p>Hello,</p>
    <p>Here are your files:</p>
    <ul>
      ${files}
    </ul>
    <p>If you did not request this, please ignore this message.</p>
    <p>Thank you,<br/>The Medical City</p>`,
  };
}
