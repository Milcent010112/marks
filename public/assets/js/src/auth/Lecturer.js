import fetch from "../helpers/fetch";
import { formatLecturers, formatSelect, formatModules } from "../helpers/formater";
import { isAlpha, isEmail } from "../helpers/validation";
import showError from "../helpers/show-error";

class LecturerAuth {
    constructor() {
        if (!LecturerAuth.instance) {
            LecturerAuth.instance = this;
        }

        return LecturerAuth.instance;
    }

    async add () {
        const firstname = $('#lecturer-first-name').val(),
            lastname = $('#lecturer-last-name').val(),
            email = $('#lecturer-email').val(),
            password = $('#lecturer-password').val(),
            passwordAgain = $('#lecturer-con-password').val(),
            modules = [];

        Array.from($('.modules__item')).forEach(_module => {
            modules.push(_module.value);
        });

        try {
            if (modules.includes('select'))
                throw 'Please select a module';

            if (!isAlpha(firstname))
                throw 'First name cannot contain special characters or white space or numbers';

            if (!isAlpha(lastname))
                throw 'Last name cannot contain special characters or white space or numbers';

            if (!isEmail(email))
                throw 'Email address is invalid';

            const response = await fetch('/lecturers/add', {
                body: {
                    firstname,
                    lastname,
                    email,
                    modules,
                    password,
                    passwordAgain
                }
            });

            if (response.successful) 
                return location.href = response.redirect

            throw response.error;
        } catch (e) { showError('new-lecturer-modal-error', e); }
    }

    async signIn () {
        const email = $('#email-address').val(),
            password = $('#password').val();

        const response = await fetch('/lecturer/sign-in', {
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

    async getLecturers () {
        const response = await fetch('/lecturers/fetch');

        // $('#lecturer-module-1').html(formatSelect((await fetch('/modules/fetch')).modules));

        if (response.lecturers && response.lecturers.length > 0) {
            $('#registered-lecturers').show()
            $('#no-registered-lecturers').hide()

            return formatLecturers(response.lecturers);
        }

        $('#registered-lecturers').hide()
        $('#no-registered-lecturers').show()
    }

    async searchAdminLecturers (searchValue) {
        const response = await fetch(`/lecturers/search/admin?q=${searchValue}`);

        if (response.lecturers && response.lecturers.length > 0) {
            $('#registered-lecturers').show()
            $('#no-registered-lecturers').hide()
            
            return formatLecturers(response.lecturers);
        }

        $('#registered-lecturers').hide()
        $('#no-registered-lecturers').show()
    }

    async getModules () {
        const response = await fetch('/lecturer/fetch/modules');

        return formatModules(response.modules, false);
    }

    async getLecturerDetails (lecturerId) {
        const response = await fetch(`/lecturer/${lecturerId}/fetch`);

        return response.lecturer;
    }

    async deleteLecturer (lecturerId) {
        const response = await fetch(`/lecturer/${lecturerId}/delete`);

        if (response.successful)
            location.reload(true);
    }

    async editLecturer (lecturerId) {
        const firstname = $('#edit-lecturer-first-name').val(),
            lastname = $('#edit-lecturer-last-name').val(),
                email = $('#edit-lecturer-email').val()

        try {
            if (!isAlpha(firstname))
                throw 'First name cannot contain special characters or white space or numbers';

            if (!isAlpha(lastname))
                throw 'Last name cannot contain special characters or white space or numbers';

            if (!isEmail(email))
                throw 'Email address is invalid';

            const response = await fetch(`/lecturer/${lecturerId}/edit`, {
                body: {
                    firstname,
                    lastname,
                    email
                }
            });

            if (response.successful)
                return location.reload(true);

            throw response.error;
        } catch (e) { showError('edit-lecturer-modal-error', e); }
    }
}

export default new LecturerAuth;