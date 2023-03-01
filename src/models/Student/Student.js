const Model = require('../Model');

class Student extends Model {
    constructor (mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            studentNumber: { type: String, required: true },
            modules: [{
                type: mongoose.Schema.ObjectId, required: true, ref: 'Module'
            }],
            email: { type: String, required: true },
            photo: { type: String, default: 'blank profile.png' },
            funderID: { type: mongoose.Schema.ObjectId, ref: 'Funder' },
            password: { type: String, required: true },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Student', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    updateStudent = (_id, data) => this.model.updateOne(
        { _id },
        data
    );

    searchAdminStudents = (query, select = '') => this.model.findWithOr({
        condition: [
            { firstname: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { lastname: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { studentNumber: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { email: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false }
        ],
        select
    })

    getByEmail = (email, select = '') => this.model.findOne({
        condition: { email, isDeleted: false },
        select
    });

    getById = (studentId, select = '') => this.model.findOne({
        condition: { _id: studentId, isDeleted: false },
        select
    });

    getByStudentNumber = (studentNumber, select = '') => this.model.findOne({
        condition: { studentNumber, isDeleted: false },
        select
    }); 

    getStudents = (select = '') => this.model.find({
        condition: { isDeleted: false },
        select
    });

    getModuleStudents = (moduleId, select = '') => this.model.find({
        condition: { modules: moduleId, isDeleted: false },
        select
    });
};

module.exports = Student;