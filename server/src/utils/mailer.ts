import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const fromAddress = process.env.EMAIL_FROM || "no-reply@example.com";

if (!smtpHost || !smtpUser || !smtpPass) {
  console.warn("Mailer: SMTP not fully configured. Forgot-password emails will fail until SMTP env vars are set.");
}

export const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export async function sendMail(to: string, subject: string, html: string) {
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("sendMail: SMTP not configured. Skipping email send to", to);
    return;
  }
  await transporter.sendMail({
    from: fromAddress,
    to,
    subject,
    html,
  });
}
