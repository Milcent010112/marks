const Model = require('../Model');

class Secretary extends Model {
    constructor (mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Secretary', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    fetchByEmail = (email, select = '') => this.model.findOne({
        condition: { email, isDeleted: false },
        select
    });

    searchAdminSecretaries = (query, select = '') => this.model.findWithOr({
        condition: [
            { firstname: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { lastname: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { email: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false }
        ],
        select
    })

    getSecretaries = (select = '') => this.model.find({
        condition: { isDeleted: false },
        select
    });
};

module.exports = Secretary;