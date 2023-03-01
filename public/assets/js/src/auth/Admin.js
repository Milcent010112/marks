import fetch from "../helpers/fetch";
import showError from "../helpers/show-error";

class AdminAuth {
    constructor() {
        if (!AdminAuth.instance) {
            AdminAuth.instance = this;
        }

        return AdminAuth.instance;
    }

    async signIn () {
        const email = $('#email-address').val(),
            password = $('#password').val();

        const response = await fetch('/admin/sign-in', {
            body: {
                email,
                password
            }
        });

        if (response.successful) {
            location.href = response.redirect;

            return;
        }

        showError('sign-in-error', response.error);
    }
}

export default new AdminAuth;