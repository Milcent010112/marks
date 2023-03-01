const grade = require('../models/Grade');
const student = require('../models/Student');
const funder = require('../models/Funder');
const test = require('../models/Test');
const _module = require('../models/Module');
const Mailer = require('../helpers/Mailer');

class GradeServices {
    constructor() {
        if (!GradeServices.instance) {
            GradeServices.instance = this;
        }

        return GradeServices.instance;
    }

    async addGrade ({ lecturer, studentNumber, testId, testGrade }) {
        try {
            if (testId == 'select')
                throw 'Please select a test';

            const testDetails = await test.getTest(testId, 'name weight');

            if (!testDetails)
                throw 'Could not find a matching test';

            const studentDetails = await student.getByStudentNumber(studentNumber, '_id firstname lastname email studentNumber funder');

            if (!studentDetails)
                throw `Could not find student with student number ${studentNumber}`;

            const actualGrade = parseInt(testGrade);

            if (await grade.exists({ testID: testId, studentID: studentDetails._id }))
                throw `The test: ${testDetails.name} has already been graded`;

            if (await student.exists({ _id: studentDetails._id, isDeleted: true }))
                throw `Student: ${studentNumber} no longer exists`;

            await grade.add({
                lecturerID: lecturer,
                studentID: studentDetails._id,
                studentNumber: studentDetails.studentNumber,
                testID: testId,
                actualGrade,
                semesterGrade: parseFloat(testGrade * (testDetails.weight / 100))
            });

            // funder parseInt(testGrade)
            if (!studentDetails.funder || actualGrade > 50)
                return;

            const funderDetails = await funder.getFunderDetails(studentDetails.funder, 'email');

            try {
                await Mailer.send({
                    to: funderDetails.email,
                    from: 'Academic Goal Monitoring <gabriel@testept.com>',
                    subject: 'Student your funding is failing',
                    message: `
                    Student, ${studentDetails.firstname + ' ' + studentDetails.lastname}

                    The aforementioned student, whom you are currently providing financial support for, is not performing well in the module: ${testDetails.module.name}.
                    In a recent test (${testDetails.name}), he/she received a grade of ${actualGrade}.
                `
                })

                await Mailer.send({
                    to: studentDetails.email,
                    from: 'Academic Goal Monitoring <gabriel@testept.com>',
                    subject: 'Poor academic performance',
                    message: `
                    Student, ${studentDetails.firstname + ' ' + studentDetails.lastname}

                    We have noted that you have not been doing well in your academics, specifically the test recent test (${testDetails.name}). Here are some improvement tips:

                    <ul>
                        <li>1. Get enough sleep.</li>
                        <li>2. Create a study time table.</li>
                        <li>3. Study enough, prior to exams.</li>
                        <li>4. Use repetition method.</li>
                        <li>5. Take short breaks in between studies.</li>
                    </ul>
                `
                })
            } catch (e) { }
        } catch (e) { throw e; }
    }

    async getStudentsGrades (lecturerId) {
        return await grade.getStudentsGrades(lecturerId);
    }

    async getSecretaryGrades () {
        return await grade.getSecretaryGrades();
    }

    async searchAdminGrades (query) {
        let grades = [], moduleCodes = [];

        try {
            const tests = await test.searchAdminTests(query);

            for (let i = 0; i < tests.length; i++) {
                let _grades = await grade.getGradesByTest(tests[i]._id);

                _grades.forEach(_grade => {
                    grades.push(_grade);
                })
            }

            const students = await student.searchAdminStudents(query);

            for (let i = 0; i < students.length; i++) {
                let _grades = await grade.getGradesByStudent(students[i]._id);

                _grades.forEach(_grade => {
                    grades.push(_grade);
                })
            }

            for (let i = 0; i < grades.length; i++) {
                moduleCodes.push(await _module.getModule(grades[i].test.module, 'code'));
            }

            return {grades, moduleCodes};
        } catch (e) { throw e; }
    }

    async searchLecturerGrades (query, lecturerId) {
        let grades = [];

        try {
            const tests = await test.searchLecturerTests(query, lecturerId);

            for (let i = 0; i < tests.length; i++) {
                let _grades = await grade.getGradesByTest(tests[i]._id);

                _grades.forEach(_grade => {
                    grades.push(_grade);
                })
            }

            const students = await student.searchAdminStudents(query);

            for (let i = 0; i < students.length; i++) {
                let _grades = await grade.getGradesByStudentAndLecturer(students[i]._id, lecturerId);

                _grades.forEach(_grade => {
                    grades.push(_grade);
                })
            }

            return grades;
        } catch (e) { throw e; }
    }

    async getAll () {
        const grades = await grade.getAll(), moduleCodes = [];

        for (let i = 0; i < grades.length; i++) {
            moduleCodes.push(await _module.getModuleDeleteIgnore(grades[i].testID.moduleID, 'code'));
        }

        return { grades, moduleCodes };
    }

    async getGrades (studentId) {
        return await grade.getGrades(studentId);
    }

    async requestDeletion (gradeId) {
        try {
            return await grade.requestDeletion(gradeId);
        } catch (e) { throw e; }
    }

    async editGrade (gradeId, newGrade) {
        try {
            return await grade.edit(gradeId, newGrade);
        } catch (e) { throw e; }
    }

    async deleteGrade (gradeId) {
        try {
            return await grade.delete(gradeId);
        } catch (e) { throw e; }
    }

    async publishGrade (gradeId) {
        try {
            return await grade.publishGrade(gradeId);
        } catch (e) { throw e; }
    }
};

module.exports = new GradeServices;