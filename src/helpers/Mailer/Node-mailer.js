class NodeMailer {
    constructor (nodeMailer) {
        this.nodeMailer = nodeMailer;
    }

    createTransport () {
        this.transporter = this.nodeMailer.createTransport({
            host: 'mail.privateemail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'gabriel@testept.com',
                pass: '@Motempane7'
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    async send (email) {
        await this.transporter.sendMail({
            from: email.from,
            to: email.to,
            subject: email.subject,
            html: email.message,
            attachments: email.attachments
        })
    }
}

module.exports = NodeMailer;