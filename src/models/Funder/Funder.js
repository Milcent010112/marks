const Model = require('../Model');

class Funder extends Model {
    constructor (mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            name: { type: String, required: true },
            email: { type: String, required: true },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Funder', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    getAll = (select = '') => this.model.find({
        condition: { isDeleted: false },
        select
    });

    search = (query, select) => this.model.findWithOr({
        condition: [
            { name: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { email: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false }
        ],
        select
    });

    getFunderDetails = (_id, select = '') => this.model.findOne({
        condition: { _id },
        select
    });

    updateFunder = (_id, name, email) => this.model.updateOne(
        { _id },
        { name, email }
    );
};

module.exports = Funder;