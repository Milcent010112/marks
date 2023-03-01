import fetch from "../helpers/fetch";
import { formatSecretaries } from "../helpers/formater";
import { isAlpha, isEmail } from "../helpers/validation";
import showError from "../helpers/show-error";

class SecretaryAuth {
    constructor () {
        if (!SecretaryAuth.instance) {
            SecretaryAuth.instance = this;
        }

        return SecretaryAuth.instance;
    }

    async add () {
        const firstname = $('#secretary-first-name').val(),
            lastname = $('#secretary-last-name').val(),
            email = $('#secretary-email').val();

        try {
            if (!isAlpha(firstname))
                throw 'First name cannot contain special characters or white space or numbers';

            if (!isAlpha(lastname))
                throw 'Last name cannot contain special characters or white space or numbers';

            if (!isEmail(email))
                throw 'Email address is invalid';

            const response = await fetch('/secretaries/add', {
                body: {
                    firstname,
                    lastname,
                    email
                }
            });

            if (response.successful)
                return location.reload(true);

            return response.error;
        } catch (e) { showError('new-secretary-error', e); }
    }

    async signIn () {
        const email = $('#email-address').val(),
            password = $('#password').val();

        const response = await fetch('/secretary/sign-in', {
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

    async searchAdminSecretaries (searchValue) {
        const response = await fetch(`/secretaries/search/admin?q=${searchValue}`);

        if (response.secretaries && response.secretaries.length > 0) {
            $('#registered-secretaries').show()
            $('#no-registered-secretaries').hide()
            
            return formatSecretaries(response.secretaries);
        }

        $('#registered-secretaries').hide()
        $('#no-registered-secretaries').show()
    }

    async getSecretaries () {
        const response = await fetch('/secretaries/fetch');

        if (response.secretaries && response.secretaries.length > 0) {
            $('new-secretary-btn').attr('disabled', true);
            $('#registered-secretaries').show()
            $('#no-registered-secretaries').hide()
            
            return formatSecretaries(response.secretaries);
        } 

        $('#registered-secretaries').hide()
        $('#no-registered-secretaries').show()
    }
}

export default new SecretaryAuth;