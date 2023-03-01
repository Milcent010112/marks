const Model = require('../Model');

class Tutorial extends Model {
    constructor(mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            lecturerID: { type: mongoose.Schema.ObjectId, required: true, ref: 'Lecturer' },
            moduleID: { type: mongoose.Schema.ObjectId, required: true, ref: 'Module' },
            link: { type: String, required: true },
            description: { type: String, required: true },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Tutorial', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    getAll = (select = '') => this.model.find({
        condition: { isDeleted: false },
        select
    });

    getLecturerTutorials = (lecturerId, select = '') => this.model.find({
        condition: { lecturerID: lecturerId, isDeleted: false },
        populate: [['moduleID', 'name']],
        select
    });

    searchLecturerTutorials = (query, lecturerId, select = '') => this.model.findWithOr({
        condition: [
            { description: { $regex: this.parseRegex(`/${query}/i`) }, lecturerID: lecturerId, isDeleted: false },
        ],
        populate: [['moduleID', 'name']],
        select
    })

    getByModule = (moduleId, select = '') => this.model.find({
        condition: { moduleID: moduleId, isDeleted: false },
        populate: [['moduleID', 'name']],
        select
    });
};

module.exports = Tutorial;