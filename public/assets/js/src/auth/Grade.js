import fetch from "../helpers/fetch";
import {
    formatStudentsGradesLecturer,
    formatStudentsGradesSecretary,
    formatStudentsGradesAdmin,
    formatSelect
} from "../helpers/formater";
import { isNumber } from "../helpers/validation";
import showError from "../helpers/show-error";

class GradeAuth {
    constructor() {
        if (!GradeAuth.instance) {
            GradeAuth.instance = this;
        }

        return GradeAuth.instance;
    }

    async add () {
        const studentNumber = $('#student-number').val(),
            testGrade = $('#test-grade').val(),
            testId = $('#student-test').val();

        try {
            if (!isNumber(testGrade))
                throw 'Grade must be a number';

            const response = await fetch('/grades/add', {
                body: {
                    studentNumber,
                    testGrade,
                    testId
                }
            });

            if (response.successful)
                return location.reload(true);

            throw response.error;
        } catch (e) { showError('new-student-grade-error', e) }
    }

    async getGrades () {
        const response = await fetch('/grades/fetch');

        $('#test-id').html(formatSelect((await fetch('/tests/fetch/lecturer')).tests));
        
        if (response.grades && response.grades.length > 0)
            return formatStudentsGradesLecturer(response.grades);
            
        $('#no-student-grades').show()
    }

    async getAll () {
        const response = await fetch('/grades/fetch/all');

        if (response.grades && response.grades.length > 0) {
            $('#student-grades').show()
            $('#no-grades').hide()
        
            return formatStudentsGradesAdmin(response.grades, response.moduleCodes);
        }
            
        $('#student-grades').hide()
        $('#no-grades').show()
    }

    async getSecretaryGrades () {
        const response = await fetch('/grades/fetch/secretary');

        if (response.grades && response.grades.length > 0)
            return formatStudentsGradesSecretary(response.grades);
        
        $('#no-student-grades').show()
    }

    async searchAdminGrades (searchValue) {
        const response = await fetch(`/grades/search/admin?q=${searchValue}`);

        if (response.grades && response.grades.length > 0) {
            $('#student-grades').show()
            $('#no-grades').hide()

            return formatStudentsGradesAdmin(response.grades, response.moduleCodes);
        }

        $('#student-grades').hide()
        $('#no-grades').show()
    }

    async searchLecturerGrades (searchValue) {
        const response = await fetch(`/grades/search/lecturer?q=${searchValue}`);

        if (response.grades && response.grades.length > 0) {
            $('#students-grades').show()
            $('#no-student-grades').hide()
            
            return formatStudentsGradesLecturer(response.grades);
        }

        $('#students-grades').hide()
        $('#no-student-grades').show()
    }

    async publishGrade (gradeId) {
        const response = await fetch(`/grade/${gradeId}/publish`);

        if (response.successful) {
            location.reload(true);
        }
    }

    async deleteGrade (gradeId) {
        const response = await fetch(`/grade/${gradeId}/delete`);

        if (response.successful) {
            location.reload(true);
        }
    }

    async requestDeletion (gradeId) {
        const response = await fetch(`/grade/${gradeId}/delete-request`);

        if (response.successful) {
            location.reload(true);
        }
    }

    async editGrade (gradeId) {
        const response = await fetch(`/grade/${gradeId}/edit`, {
            body: {
                grade: $('#edt-test-grade').val()
            }
        });

        if (response.successful) {
            location.reload(true);
        }
    }
}

export default new GradeAuth;