const goal = require('../models/Goal');
const grade = require('../models/Grade');
const _module = require('../models/Module');
const student = require('../models/Student');
const test = require('../models/Test');

const puppeteer = require('puppeteer');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

class ProgressServices {
    constructor () {
        if (!ProgressServices.instance) {
            ProgressServices.instance = this;
        }

        return ProgressServices.instance;
    }

    async getProgress (modules, studentId) {
        const tests = {};

        try {
            for (let m = 0; m < modules.length; m++) {
                const allTests = await test.getModuleTests(modules[m]);

                for (let t = 0; t < allTests.length; t++) {
                    tests[allTests[t].moduleID.name] = tests[allTests[t].moduleID.name] || { perc: 0, finalGrade: 0, goal: null };

                    if (!tests[allTests[t].moduleID.name].goal) {
                        const goalDetails = await goal.getGoalByStudent(studentId, allTests[t].moduleID._id);

                        if (goalDetails)
                            tests[allTests[t].moduleID.name].goal = goalDetails.goal
                    }

                    tests[allTests[t].moduleID.name].perc = tests[allTests[t].moduleID.name].perc + allTests[t].weight;

                    const studentGrade = await grade.getGradeByTestAndStudent(studentId, allTests[t]) || { actualGrade: 0 };

                    tests[allTests[t].moduleID.name].finalGrade =
                        tests[allTests[t].moduleID.name].finalGrade +
                        ((allTests[t].weight / 100) * studentGrade.actualGrade);
                }
            }
        } catch (e) {
            throw e;
        }

        return tests;
    }

    async downloadReport (modules, studentId) {
        const studentDetails = await student.getById(studentId);

        const tests = await ProgressServices.instance.getProgress(modules, studentId);

        const params = process.env.NODE_ENV == 'production' ?
            { executablePath: '/usr/bin/chromium-browser' } :
            {}

        params.args = ["--no-sandbox"]

        const browser = await puppeteer.launch(params);

        const page = await browser.newPage();

        const fileName = `Report_Of_${studentDetails.firstname + '_' + studentDetails.lastname + '[' + Date.now() + '].pdf'}`;

        const filePath = path.join(
            __dirname,
            `../../public/assets/downloads/tmp/`
        );

        const css = await fs.readFileSync(
            path.join(__dirname, '../../public/assets/css/main.css')
        ).toString();

        const reportHtml = await ejs.renderFile(
            path.join(__dirname, '../views/partials/documents/progress-report.ejs'), {
                modules:tests,
                studentDetails,
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

module.exports = new ProgressServices;