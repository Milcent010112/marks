const student = require('../models/Student');
const grade = require('../models/Grade')
const _module = require('../models/Module')

const puppeteer = require('puppeteer');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

module.exports.downloadStudentReport = async (studentId) => {
    const studentDetails = await student.getById(studentId);
    const grades = await grade.getGradesByStudent(studentId);

    const moduleCodes = [];

    for (let i = 0; i < grades.length; i++) {
        moduleCodes.push(await _module.getModuleDeleteIgnore(grades[i].testID.moduleID, 'code'));
    }

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
        path.join(__dirname, '../views/partials/documents/student-report.ejs'), {
            grades,
            moduleCodes,
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