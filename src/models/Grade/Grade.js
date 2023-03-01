const Model = require('../Model');

class Grade extends Model {
    constructor(mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            lecturerID: { type: mongoose.Schema.ObjectId, required: true, ref: 'Lecturer' },
            studentID: { type: mongoose.Schema.ObjectId, required: true, ref: 'Student' },
            studentNumber: { type: String, required: true },
            testID: { type: mongoose.Schema.ObjectId, required: true, ref: 'Test' },
            actualGrade: { type: Number, required: true },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Grade', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    getGradeByTestAndStudent = (studentId, testId) => this.model.findOne({
        condition: { studentID: studentId, testID: testId, isDeleted: false },
        select: 'actualGrade'
    });

    getGradesByTest = (testId) => this.model.find({
        condition: { tesIDt: testId, isDeleted: false },
        populate: [['studentID', 'studentNumber firstname lastname'], ['testID', 'name moduleID']]
    });

    getGradesByStudent = (studentId) => this.model.find({
        condition: { studentID: studentId, isDeleted: false },
        populate: [['studentID', 'studentNumber firstname lastname'], ['testID', 'name moduleID weight']]
    });

    getGradesByStudentAndLecturer = (studentId, lecturerId) => this.model.find({
        condition: { studentID: studentId, lecturerID: lecturerId, isDeleted: false },
        populate: [['studentID', 'studentNumber firstname lastname'], ['testID', 'name moduleID']]
    });

    searchLecturerGrades = (query, lecturerId, select = '') => this.model.findWithOr({
        condition: [
            { grade: { $regex: this.parseRegex(`/${query}/i`) }, lecturerID: lecturerId, isDeleted: false }
        ],
        populate: [['studentID', 'studentNumber firstname lastname'], ['testID', 'name moduleID']],
        select
    })

    getAll = (select = '') => this.model.find({
        condition: { isDeleted: false },
        populate: [['studentID', 'studentNumber firstname lastname'], ['testID', 'name moduleID']],
        select
    });

    getGrades = (studentId, select = '') => this.model.find({
        condition: { studentID: studentId, isDeleted: false },
        select
    });

    getStudentsGrades = (lecturerId, select = '') => this.model.find({
        condition: { lecturerID: lecturerId, isDeleted: false },
        populate: [['studentID', 'studentNumber lastname'], ['testID', 'name']],
        select
    });

    // getSecretaryGrades = () => this.model.findWithOr({
    //     condition: [
    //         { deleteRequest: true },
    //         { publishRequest: true }
    //     ],
    //     populate: [['studentID', 'studentNumber lastname'], ['testID', 'name']]
    // });

    // requestDeletion = (_id) => this.model.updateOne(
    //     { _id },
    //     { deleteRequest: true, publishRequest: false }
    // );

    edit = (_id, newGrade) => this.model.updateOne(
        { _id },
        { actualGrade: newGrade }
    );

    delete = (_id) => this.model.updateOne(
        { _id },
        { isDeleted: true }
    );

    // publishGrade = (_id) => this.model.updateOne(
    //     { _id },
    //     { isPublished: true, publishRequest: false }
    // );
};

module.exports = Grade;