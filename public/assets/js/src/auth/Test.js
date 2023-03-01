import fetch from "../helpers/fetch";
import {
    formatTestsLecturer,
    formatTestsSecretary,
    formatTestsStudent,
    formatTestsAdmin,
    formatSelect
} from "../helpers/formater";
import { isSpecialChar, isNumber } from "../helpers/validation";
import showError from "../helpers/show-error";

class TestAuth {
    constructor() {
        if (!TestAuth.instance) {
            TestAuth.instance = this;
        }

        return TestAuth.instance;
    }

    async addTest () {
        const name = $('#test-name').val(),
            module = $('#test-module').val();

        try {
            if (isSpecialChar(name))
                throw 'Test name cannot contain any special characters';

            const response = await fetch('/tests/add', {
                body: {
                    name,
                    module
                }
            });

            if (response.successful)
                return location.reload(true);

            throw response.error;
        } catch (e) { showError('new-test-error', e) }
    }

    async getTestDetails (testId) {
        const response = await fetch(`/test/fetch/${testId}`);

        return response.test;
    }

    async getStudentTests () {
        const response = await fetch('/tests/fetch/student');

        if (response.tests && response.tests.length > 0){
            $('#student-tests').show()
            $('#no-student-tests').hide()

            return formatTestsStudent(response);
        }

        $('#student-tests').hide()
        $('#no-student-tests').show()
    }

    async getLecturerTests () {
        const response = await fetch('/tests/fetch/lecturer');

        $('#test-module').html(formatSelect((await fetch('/lecturer/fetch/modules')).modules));

        if (response.tests && response.tests.length > 0) {
            $('#tests-and-exams').show()
            $('#no-tests-and-exams').hide()

            return formatTestsLecturer(response.tests);
        }
        
        $('#tests-and-exams').hide()
        $('#no-tests-and-exams').show()
    }

    async getSecretaryTests () {
        const response = await fetch('/tests/fetch/secretary');

        if (response.tests && response.tests.length > 0)
            return formatTestsSecretary(response.tests);
            
        $('#no-student-tests').show()
    }

    async getAdminTests () {
        const response = await fetch('/tests/fetch/all');

        if (response.tests && response.tests.length > 0) {
            $('#tests').show()
            $('#no-tests').hide()

            return formatTestsAdmin(response.tests);
        }
        
        $('#tests').hide()
        $('#no-tests').show()
    }

    async searchAdminTests (searchValue) {
        const response = await fetch(`/tests/search/admin?q=${searchValue}`);

        if (response.tests && response.tests.length > 0) {
            $('#tests').show()
            $('#no-tests').hide()

            return formatTestsAdmin(response.tests);
        }

        $('#tests').hide()
        $('#no-tests').show()
    }

    async searchLecturerTests (searchValue) {
        const response = await fetch(`/tests/search/lecturer?q=${searchValue}`);

        if (response.tests && response.tests.length > 0) {
            $('#tests-and-exams').show()
            $('#no-tests-and-exams').hide()

            return formatTestsLecturer(response.tests);
        }

        $('#tests-and-exams').hide()
        $('#no-tests-and-exams').show()
    }

    async searchStudentTests (searchValue) {
        const response = await fetch(`/tests/search/student?q=${searchValue}`);

        if (response.tests && response.tests.length > 0) {
            $('#student-tests').show()
            $('#no-student-tests').hide()

            return formatTestsStudent(response);
        }

        $('#student-tests').hide()
        $('#no-student-tests').show()
    }

    async deleteTest (testId) {
        const response = await fetch(`/test/${testId}/delete`);

        if (response.successful) {
            location.reload(true);
        }
    }

    async publishTest (testId) {
        const response = await fetch(`/test/${testId}/publish`);

        if (response.successful) {
            location.reload(true);
        }
    }

    async requestDeletion (testId) {
        const response = await fetch(`/test/${testId}/delete-request`);

        if (response.successful) {
            location.reload(true);
        }
    }
}

export default new TestAuth;