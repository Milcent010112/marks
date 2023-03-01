const Model = require('../Model');

class RefreshToken extends Model {
    constructor (mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            token: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        })

        super(mongoose, 'RefreshToken', QueryBuilder, schema);
    };
};

module.exports = RefreshToken;