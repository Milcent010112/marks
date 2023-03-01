class Mailer {
    constructor (mailer) {
        this.mailer = mailer;
    }

    async send (email) {
        this.mailer.createTransport();

        await this.mailer.send(email);
    }
}

module.exports = Mailer;