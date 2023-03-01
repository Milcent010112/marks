import fetch from "../helpers/fetch";
import { formatStudents, formatStudentsAdmin, formatSelect } from "../helpers/formater";
import { isAlpha, isNumber, isEmail } from "../helpers/validation";
import showError from "../helpers/show-error";

class StudentAuth {
    constructor() {
        if (!StudentAuth.instance) {
            StudentAuth.instance = this;
        }

        return StudentAuth.instance;
    }

    async add () {
        const firstname = $('#student-first-name').val(),
            lastname = $('#student-last-name').val(),
            studentNumber = $('#student-number').val(),
            password = $('#student-password').val(),
            passwordAgain = $('#student-con-password').val(),
            email = $('#student-email').val(),
            funder = $('#student-funder').val(),
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

            if (!isNumber(studentNumber))
                throw 'Student number must be a number';

            if (!isEmail(email))
                throw 'Email address is invalid';

            const response = await fetch('/students/add', {
                body: {
                    firstname,
                    lastname,
                    studentNumber,
                    email,
                    modules,
                    funder,
                    password,
                    passwordAgain
                }
            });

            if (response.successful)
                return location.href = response.redirect;

            throw response.error;
        } catch (e) { showError('new-student-error', e) }
    }

    async updateStudent () {
        const firstname = $('#edit-student-first-name').val(),
            lastname = $('#edit-student-last-name').val(),
            email = $('#edit-student-email').val();

        if (!isAlpha(firstname))
            throw 'First name cannot contain special characters or white space or numbers';

        if (!isAlpha(lastname))
            throw 'Last name cannot contain special characters or white space or numbers';

        if (!isEmail(email))
            throw 'Email address is invalid';

        try {
            const response = await fetch(`/student/${$('#student-update-id').val()}/update`, {
                body: {
                    firstname,
                    lastname,
                    email
                }
            });

            if (response.successful)
                return location.reload();

            throw response.error;
        } catch (e) { showError('edit-student-error', e) }
    }

    async deleteStudent (studentId) {
        const response = await fetch(`/student/${studentId}/delete`);

        if (response.successful)
            return location.reload();
    }

    async downloadReport (studentId) {
        try {
            const response = await fetch(`/student/${studentId}/download-report`);

            if (response.reportFile) {
                const reportLink = $('#student-report-link')[0];

                reportLink.href = `/assets/downloads/tmp/${response.reportFile}`;

                reportLink.click();
            }
        } catch (error) {  }
    }

    async signIn () {
        const email = $('#email-address').val(),
            password = $('#password').val();

        const response = await fetch('/student/sign-in', {
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

    async getStudents () {
        const response = await fetch('/students/fetch');

        // $('#student-module-1').html(formatSelect((await fetch('/modules/fetch')).modules));
        // $('#student-funder').html(formatSelect((await fetch('/funders/fetch/all')).funders));

        if (response.students && response.students.length > 0) {
            $('#registered-students').show()
            $('#no-registered-students').hide()

            return formatStudentsAdmin(response.students);
        }
            
        $('#registered-students').hide()
        $('#no-registered-students').show()
    }

    async getModuleStudents () {
        const pagePath = location.pathname.split('/');

        const response = await fetch(`/students/fetch/module/${pagePath[pagePath.length - 2]}`);

        $('#student-test').html(formatSelect((await fetch('/tests/fetch/module', { body: { moduleId: pagePath[pagePath.length - 2] } })).tests));

        return formatStudents(response.students);
    }

    async searchAdminStudents (searchValue) {
        const response = await fetch(`/students/search/admin?q=${searchValue}`);

        if (response.students && response.students.length > 0) {
            $('#registered-students').show()
            $('#no-registered-students').hide()

            return formatStudentsAdmin(response.students);
        }

        $('#registered-students').hide()
        $('#no-registered-students').show()
    }

    async endSemester () {
        try {
            const response = await fetch(`/students/end-semester`);
        } catch (error) {  }
    }
}

export default new StudentAuth;