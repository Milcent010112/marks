const student = require('../models/Student');
const grade = require('../models/Grade');
const Hasher = require('../helpers/Hasher'); 
const funder = require('../models/Funder');

const jwt = require('../helpers/Jwt')
const v = require('../helpers/Validation');
const Mailer = require('../helpers/Mailer');
const path = require('path')

const { downloadStudentReport } = require('./Report')

class StudentServices {
    constructor () {
        if (!StudentServices.instance) {
            StudentServices.instance = this;
        }

        return StudentServices.instance;
    }

    async addStudent ({ firstname, lastname, email, studentNumber, modules, funder, password, passwordAgain }) {
        v.validate({
            'First name': { value: firstname, min: 3, max: 30 },
            'Last name': { value: lastname, min: 3, max: 30 },
            'Email address': { value: email, min: 5, max: 30 },
            'Student number': { value: studentNumber, min: 9, max: 9 },
            'Password': { value: password, min: 8, max: 16 },
            'Password confirmation': { value: passwordAgain, min: 8, max: 16, is: ['Password', 'Passwords do not match'] }
        });

        if (typeof parseInt(studentNumber) != 'number')
            throw 'Student number must be an integer';

        if (await student.exists({ studentNumber }))
            throw `An account with this student number: ${studentNumber} already exists!`;

        if (await student.exists({ email }))
            throw `An account with this email: ${email} already exists!`;

        const studentDetails = await student.add({
            firstname,
            lastname,
            email,
            studentNumber,
            modules,
            funderID: funder == 'select' ? null : funder,
            password: await Hasher.hash(password)
        });

        delete studentDetails.password;

        const jwtAccess = jwt.getAccessToken(studentDetails.toJSON());

        const jwtRefresh = jwt.getRefreshToken(studentDetails.toJSON());

        // refreshToken.add({ token: jwtRefresh });

        let redirect = '/s/goals';

        return {
            tokens: { jwtAccess, jwtRefresh },
            redirect
        };
    }

    async updateStudent ({ firstname, lastname, email, studentId }) {

        v.validate({
            'First name': { value: firstname, min: 3, max: 30 },
            'Last name': { value: lastname, min: 3, max: 30 },
            'Email address': { value: email, min: 5, max: 30 }
        });

        if (await student.exists({ email }) && !(await student.exists({ email, _id: studentId })))
            throw `An account with this email: ${email} already exists!`;

        await student.updateStudent(studentId, {
            firstname,
            lastname,
            email
        });
    }

    async changeProfile (studentId, filename) {
        await student.updateStudent(studentId, {
            photo: filename
        })

        const studentDetails = await student.getById(studentId, '-password')

        const jwtAccess = jwt.getAccessToken(studentDetails.toJSON());

        const jwtRefresh = jwt.getRefreshToken(studentDetails.toJSON());

        return { jwtAccess, jwtRefresh }
    }

    async deleteStudent (studentId) {
        await student.delete(studentId);
    }

    async getStudents () {
        return await student.getStudents(); 
    }

    async getModuleStudents (moduleId) {
        return await student.getModuleStudents(moduleId); 
    }

    async signIn ({email, password}) {
        try {
            v.validate({
                'Email address': { value: email, min: 5, max: 30 },
                'Password': { value: email, min: 5, max: 30 }
            });

            const studentDetails = await student.getByEmail(email);

            if (!studentDetails)
                throw 'Email address or password is incorrect!';
                
            if (!(await Hasher.isSame(studentDetails.password, password)))
                throw 'Email address or password is incorrect!';

            delete studentDetails.password;

            const jwtAccess = jwt.getAccessToken(studentDetails.toJSON());

            const jwtRefresh = jwt.getRefreshToken(studentDetails.toJSON());

            // refreshToken.add({ token: jwtRefresh });

            let redirect = '/s/goals';

            return {
                tokens: { jwtAccess, jwtRefresh },
                redirect
            };
        } catch (e) { throw e; }
    }

    async searchAdminStudents (query) {
        try {
            return await student.searchAdminStudents(query);
        } catch (e) { throw e; }
    }

    async endSemester () {
        const students = await student.getStudents();

        students.forEach(async _student => {
            let testAverage = 0, count = 0;

            const grades = await grade.getGradesByStudent(_student._id);

            grades.forEach(_grade => {
                testAverage += _grade.actualGrade;

                count++;
            });

            const funderDetails = await funder.getFunderDetails(_student.funderID, 'email');

            if (!funderDetails)
                return;

            try {
                const filename = await downloadStudentReport(_student._id);

                const filePath = path.join(
                     __dirname,
                     `../../public/assets/downloads/tmp/`
                );

                await Mailer.send({
                    to: funderDetails.email,
                    from: 'Academic Goal Monitoring <gabriel@testept.com>',
                    subject: 'Student end of semester results',
                    attachments: [{
                        filename,
                        path: filePath + filename
                    }],
                    message: `
                    Student, ${_student.firstname + ' ' + _student.lastname}

                    \nThe average performance of student is: ${testAverage / count}
                `
                })
            } catch (e) { console.log(e) }
        });
    }
};

module.exports = new StudentServices;