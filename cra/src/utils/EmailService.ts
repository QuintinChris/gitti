import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

class EmailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport(
            `smtps://<${process.env.USERNAME}>%40gmail.com:<${process.env.PASSWORD}>@smtp.gmail.com`
        );
    }

    sendMail(to: string, subject: string, content: string): Promise<void> {
        let options = {
            from: 'from_test@gmail.com',
            to: to,
            subject: subject,
            text: content
        }

        return new Promise<void>(
            (resolve: (msg: any) => void,
                reject: (err: Error) => void) => {
                this.transporter.sendMail(
                    options, (error, info) => {
                        if (error) {
                            return console.log(`error: ${error}`)
                        }
                        console.log(`Message Sent: ${info.response}`)
                    }
                )
            }
        )
    }
}

export default EmailService