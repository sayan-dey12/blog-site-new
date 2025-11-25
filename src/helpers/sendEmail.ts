import nodemailer from "nodemailer";
import crypto from "crypto";
import { db } from "@/lib/db";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    // ✅ Create raw + hashed token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // ✅ Store token based on email type
    if (emailType === "VERIFY") {
      await db.user.update({
        where: { id: userId },
        data: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
        },
      });
    } else if (emailType === "RESET") {
      await db.user.update({
        where: { id: userId },
        data: {
          forgotToken: hashedToken,
          forgotTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
        },
      });
    }

    // ✅ Mail Transport
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
      },
    });

    // ✅ Route paths (matches your API routes)
    const route =
      emailType === "VERIFY" ? "verifyemail" : "resetpassword";

    const link = `${process.env.DOMAIN}/${route}?token=${rawToken}&id=${userId}`;

    // ✅ Email Template
    const mailOptions = {
      from: `"Sayan from techwithstrider" <strider0003@gmail.com>`,
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email"
          : "Reset your password",
      html: `
        <div style="font-family:sans-serif;">
          <h2>Hello!</h2>
          <p>
            Please click the button below to ${
              emailType === "VERIFY"
                ? "verify your email"
                : "reset your password"
            }:
          </p>
          <a
            href="${link}"
            style="padding:10px 20px;background:#2563eb;color:white;border-radius:6px;text-decoration:none;display:inline-block;margin: 12px 0;"
          >
            ${
              emailType === "VERIFY" ? "Verify Email" : "Reset Password"
            }
          </a>
          <p>If the button doesn't work, copy this link:</p>
          <p>${link}</p>
        </div>
      `,
    };

    // ✅ Send Email
    return await transport.sendMail(mailOptions);
  } catch (error: any) {
    console.error("Email error:", error.message);
    throw new Error(error.message);
  }
};