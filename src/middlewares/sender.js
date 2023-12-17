import nodemailer from "nodemailer";

export const sendMail = (to, subject, password) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "adxamovmuxammadsodiq@gmail.com",
            pass: "wigublwzimfoyuyp",
        },
    });

    let mailOptions = {
        from: "adxamovmuxammadsodiq@gmail.com",
        to,
        subject,
        html: `<b>Your password: ${password}<b>`,
    };
    return transporter.sendMail(mailOptions);
};

