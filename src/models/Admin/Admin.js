const Model = require('../Model');

class Admin extends Model {
    constructor (mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Admin', QueryBuilder, schema);
    };

    fetchByEmail = (email, select = '') => this.model.findOne({
        condition: { email: email, isDeleted: false },
        select
    });
};

module.exports = Admin;