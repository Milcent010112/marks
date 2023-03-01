const Model = require('../Model');

class Module extends Model {
    constructor (mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            name: { type: String, required: true },
            code: { type: String, required: true },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Module', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    getModules = (select = '') => this.model.find({
        condition: {isDeleted: false },
        select
    });

    searchAdminModules = (query, select = '') => this.model.findWithOr({
        condition: [
            { name: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { code: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false }
        ],
        select
    })

    getModule = (_id, select = '') => this.model.findOne({
        condition: { _id, isDeleted: false },
        select
    });

    getModuleDeleteIgnore = (_id, select = '') => this.model.findOne({
        condition: { _id },
        select
    });

    editModule = (_id, name, code) => this.model.updateOne(
        { _id },
        { name, code }
    );
};

module.exports = Module;