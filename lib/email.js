import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export async function sendResetEmail(to, resetUrl) {
    const info = await transporter.sendMail({
        from: `"Vits Catalogue" <${process.env.SMTP_USER}>`,
        to,
        subject: "Password reset - Vits Catalogue",
        html: `
        <p>Hi, </p>
        <p>We received a request to reset your password, Click the link below to reset it. This link expires in 1 hour.</p>
        <p><a href="${resetUrl}">Click Here</a></p>
        <p>If you didn't request this, ignore this email.</p>
        `
    })
    return info;
}