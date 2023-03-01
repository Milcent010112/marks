const _module = require('../models/Module');
const test = require('../models/Test');
const goal = require('../models/Goal');
const student = require('../models/Student');
const grade = require('../models/Grade');

const v = require('../helpers/Validation');

const puppeteer = require('puppeteer');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

class ModuleServices {
    constructor () {
        if (!ModuleServices.instance) {
            ModuleServices.instance = this;
        }

        return ModuleServices.instance;
    }

    async addModule (name, code) {
        v.validate({
            'Name': { value: name, min: 5, max: 30 },
            'Code': { value: code, min: 3, max: 10 }
        });

        await _module.add({
            name,
            code
        });
    }

    async getModules () {
        return await _module.getModules(); 
    }

    async getStudentModules (modules) {
        let toReturn = []

        for (let i = 0; i < modules.length; i++) {
            let details = await _module.getModule(modules[i]);

            toReturn.push({
                _id: details._id,
                name: details.name
            })
        }

        return toReturn;
    }

    async getModule (moduleId) {
        return await _module.getModule(moduleId); 
    }

    async searchAdminModules (query) {
        return await _module.searchAdminModules(query); 
    }

    async deleteModule (moduleId) {
        return await _module.delete(moduleId); 
    }

    async editModule (moduleId, name, code) {
        return await _module.editModule(moduleId, name, code); 
    }

    async getStudentGoalReport (moduleId) {
        const moduleDetails = await _module.getModule(moduleId);

        const tests = await test.getModuleTests(moduleId);

        const students = await student.getModuleStudents(moduleId)

        const studentsToReturn = [];

        for (let s = 0; s < students.length; s++) {
            const studentDetails = students[s]

            const f = {}

            f.moduleGoal = await goal.getGoalByStudent(studentDetails._id, moduleId)

            if (!f.moduleGoal)
                continue;

            f.moduleGoal = f.moduleGoal.goal

            f.student = {
                no: studentDetails.studentNumber,
                firstname: studentDetails.firstname,
                lastname: studentDetails.lastname
            }
            
            f.moduleGrade = 0

            for (let t = 0; t < tests.length; t++) {
                const testDetails = tests[t];

                const _grade = await grade.getGradeByTestAndStudent(studentDetails._id, testDetails._id);

                f.moduleGrade += _grade ? (testDetails.weight / 100) * _grade.actualGrade :  0
            }
            
            f.hasReached = f.moduleGrade >= f.moduleGoal

            studentsToReturn.push(f)
        }

        const params = process.env.NODE_ENV == 'production' ?
            { executablePath: '/usr/bin/chromium-browser' } :
            {}

        params.args = ["--no-sandbox"]

        const browser = await puppeteer.launch(params);

        const page = await browser.newPage();

        const fileName = `Report_Of_${moduleDetails.name + '[' + Date.now() + '].pdf'}`;

        const filePath = path.join(
            __dirname,
            `../../public/assets/downloads/tmp/`
        );

        const css = await fs.readFileSync(
            path.join(__dirname, '../../public/assets/css/main.css')
        ).toString();

        const reportHtml = await ejs.renderFile(
            path.join(__dirname, '../views/partials/documents/module-report.ejs'), {
                students: studentsToReturn,
                moduleDetails,
                css: `<style>${css}</style>`
            }
        );

        await page.setContent(reportHtml);
        await page.emulateMediaType('screen');
        await page.pdf({
            path: filePath + fileName,
            format: 'A4',
            printBackground: true
        });

        await browser.close();

        return fileName;
    }
};

module.exports = new ModuleServices;