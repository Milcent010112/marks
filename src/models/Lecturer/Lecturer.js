const Model = require('../Model');

class Lecturer extends Model {
    constructor(mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true },
            modules: [{
                type: mongoose.Schema.ObjectId, required: true, ref: 'Module'
            }],
            password: { type: String, required: true },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Lecturer', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    getByEmail = (email, select = '') => this.model.findOne({
        condition: { email, isDeleted: false },
        populate: [['modules', 'code name createdAt']],
        select
    });

    searchAdminLecturers = (query, select = '') => this.model.findWithOr({
        condition: [
            { firstname: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { lastname: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { email: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false }
        ],
        select
    })

    getLecturers = (select = '') => this.model.find({
        condition: { isDeleted: false },
        select
    });

    getLecturer = (_id, select = '') => this.model.findOne({
        condition: { _id, isDeleted: false },
        select
    });

    editLecturer = (_id, lecturerDetails) => this.model.updateOne(
        { _id },
        lecturerDetails
    );
};

module.exports = Lecturer;