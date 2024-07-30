import nodemailer from 'nodemailer'



export const sendMail = async (subject: string, to: string ,  message: string) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });


    const mailOptions = {
        from: `${process.env.FROM_EMAIL}`,
        to,
        subject,
        message,
    };


    const info  = await transporter.sendMail(mailOptions);

}



