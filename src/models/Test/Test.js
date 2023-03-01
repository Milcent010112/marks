const Model = require('../Model');

class Test extends Model {
    constructor (mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            name: { type: String, required: true },
            moduleID: { type: mongoose.Schema.ObjectId, required: true, ref: 'Module' },
            lecturerID: { type: mongoose.Schema.ObjectId, required: true, ref: 'Lecturer' },
            weight: { type: Number, required: true },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Test', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    getAll = (select = '') => this.model.find({
        condition: { isDeleted: false },
        populate: [['lecturerID', 'firstname lastname'], ['moduleID', 'name']],
        select
    });

    searchAdminTests = (query, select = '') => this.model.findWithOr({
        condition: [
            { name: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false }
        ],
        populate: [['lecturerID', 'firstname lastname'], ['moduleID', 'name']],
        select
    })

    searchLecturerTests = (query, lecturerId, select = '') => this.model.findWithOr({
        condition: [
            { name: { $regex: this.parseRegex(`/${query}/i`) }, lecturerID: lecturerId, isDeleted: false }
        ],
        populate: [['lecturerID', 'firstname lastname'], ['moduleID', 'name']],
        select
    })

    searchStudentTests = (query, select = '') => this.model.findWithOr({
        condition: [
            { name: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { weight: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false }
        ],
        populate: [['moduleID', 'name']],
        select
    })

    getTest = (_id, select = '') => this.model.findOne({
        condition: { _id, isDeleted: false },
        populate: [['moduleID', 'name']],
        select
    });

    getModuleTests = (moduleId, select = '') => this.model.find({
        condition: { moduleID: moduleId, isDeleted: false },
        populate: [['lecturerID', 'firstname lastname'], ['moduleID', 'name']],
        select
    });

    getLecturerTests = (lecturerId, select = '') => this.model.find({
        condition: { lecturerID: lecturerId, isDeleted: false },
        populate: [['lecturerID', 'firstname lastname'], ['moduleID', 'name']],
        select
    });

    // requestPublish = (_id) => this.model.updateOne(
    //     { _id },
    //     { publishRequest: true }
    // );

    publish = (_id) => this.model.updateOne(
        { _id },
        { isPublished: true, publishRequest: false }
    );

    // getSecretaryTests = () => this.model.findWithOr({
    //     condition: [
    //         { deleteRequest: true },
    //         { publishRequest: true }
    //     ],
    //     populate: [['moduleID', 'name']]
    // });

    // requestDeletion = (_id) => this.model.updateOne(
    //     { _id },
    //     { deleteRequest: true, publishRequest: false }
    // );

    delete = (_id) => this.model.updateOne(
        { _id },
        { isDeleted: true }
    );
};

module.exports = Test;