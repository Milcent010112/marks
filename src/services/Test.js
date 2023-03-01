const test = require('../models/Test');
const grade = require('../models/Grade');
const _module = require('../models/Module');
const lecturer = require('../models/Lecturer');

const v = require('../helpers/Validation');


class TestServices {
    constructor () {
        if (!TestServices.instance) {
            TestServices.instance = this;
        }

        return TestServices.instance;
    }

    async addTest ({name, module: _module, lecturer}) {
        const testTypes = {
            summative: 40,
            'formative 1': 20,
            'formative 2': 20,
            'semester work': 20,
        }

        if (name == 'select')
            throw 'Please select a test';

        const weight = testTypes[name];

        if (await test.exists({name, moduleID: _module}))
            throw 'Test already added!';

        await test.add({
            name,
            moduleID: _module,
            weight,
            lecturerID: lecturer
        });
    }

    async getTest (testId) {
        return await test.getTest(testId); 
    }

    async getModuleTests (moduleId) {
        return await test.getModuleTests(moduleId); 
    }

    async getLecturerTests (lecturerModules, lecturerId) {
        let tests = [];

        for (let j = 0; j < lecturerModules.length; j++) {
            const lecturerTests = await test.getModuleTests(lecturerModules[j]._id);

            for (let i = 0; i < lecturerTests.length; i++)
                tests.push(lecturerTests[i]);
        }

        return tests;
    }

    async getStudentTests (studentId, studentModules) {
        const tests = [], grades = [];

        for (let j = 0; j < studentModules.length; j++) {
            const studentTests = await test.getModuleTests(studentModules[j]);

            for (let i = 0; i < studentTests.length; i++) {
                const testGrade = await grade.getGradeByTestAndStudent(studentId, studentTests[i]._id) || { actualGrade: 'Not graded' };

                studentTests[i]._id = 0;

                tests.push(studentTests[i]);

                grades.push({ value: testGrade.actualGrade, isPublished: testGrade.isPublished });
            }
        }

        return {tests, grades};
    }

    async getSecretaryTests () {
        const secretaryTests = await test.getSecretaryTests();

        return secretaryTests;
    }

    async getAll () {
        const allTests = await test.getAll();

        return allTests;
    }

    async requestDeletion (testId) {
        try {
            return await test.requestDeletion(testId);
        } catch (e) { throw e; }
    }

    async deleteTest (testId) {
        try {
            return await test.delete(testId);
        } catch (e) { throw e; }
    }

    async requestPublish (testId) {
        try {
            return await test.requestPublish(testId);
        } catch (e) { throw e; }
    }

    async publishTest (testId) {
        try {
            return await test.publish(testId);
        } catch (e) { throw e; }
    }

    async searchAdminTests (query) {
        let tests = [];
        
        try {
            const lecturers = await lecturer.searchAdminLecturers(query);

            for (let i = 0; i < lecturers.length; i++) {
                let _tests = await test.getLecturerTests(lecturers[i]._id);

                _tests.forEach(_test => {
                    tests.push(_test);
                })
            }

            const modules = await _module.searchAdminModules(query);

            for (let i = 0; i < modules.length; i++) {
                let _tests = await test.getModuleTests(modules[i]._id);

                _tests.forEach(_test => {
                    tests.push(_test);
                })
            }

            (await test.searchAdminTests(query)).forEach(_test => {
                tests.push(_test);
            })

            return tests;
        } catch (e) { throw e; }
    }

    async searchLecturerTests (query, lecturerId) {
        let tests = [];

        try {
            (await test.searchLecturerTests(query, lecturerId)).forEach(_test => {
                tests.push(_test);
            })

            return tests;
        } catch (e) { throw e; }
    }

    async searchStudentTests (query, studentId, modules) {
        let tests = [], grades = [];

        try {
            const studentTests = (await test.searchStudentTests(query));

            for (let i = 0; i < studentTests.length; i++) {
                if (modules.includes(String(studentTests[i].module._id)) && studentTests[i].isPublished) {
                    tests.push(studentTests[i]);

                    const testGrade = await grade.getGradeByTestAndStudent(studentId, studentTests[i]._id) || { actualGrade: 'Not graded' };

                    studentTests[i]._id = 0;

                    grades.push(testGrade.actualGrade);
                }
            }

            return {tests, grades};
        } catch (e) { throw e; }
    }
};

module.exports = new TestServices;