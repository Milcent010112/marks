import admin from "../auth/Admin";
import lecturer from "../auth/Lecturer";
import secretary from "../auth/Secretary";
import student from "../auth/Student";
import showError from "../helpers/show-error";

export default () => {
    if (!targetPage || targetPage != 'sign-in')
        return;

    $('#sign-in-form').on('submit', e => {
        try {
            e.preventDefault();

            const loginOptions = { admin, lecturer, secretary, student }

            // get radio button value
            const loginType = $('input[name="login-type"]:checked').val(); // admin, lecturer, secretary, student

            // if no radion button has been clicked, throw error
            if (!loginType)
                throw 'Please select account type';

            loginOptions[loginType].signIn();
        } catch (e) { showError('sign-in-error', e) }
    });
};