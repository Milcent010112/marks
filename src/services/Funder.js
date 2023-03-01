const funder = require('../models/Funder');

class FunderServices {
    constructor () {
        if (!FunderServices.instance) {
            FunderServices.instance = this;
        }

        return FunderServices.instance;
    }

    async addFunder (name, email) {
        try {
            if (await funder.exists({ email }))
                throw `A funder with the email: ${email} exists already `;

            await funder.add({ name, email }); 
        } catch (e) { throw e; }
    }

    async getAll () {
        try {
            return await funder.getAll(); 
        } catch (e) { throw e; }
    }

    async search (query) {
        try {
            return await funder.search(query); 
        } catch (e) { throw e; }
    }

    async getFunderDetails (funderId) {
        try {
            return await funder.getFunderDetails(funderId); 
        } catch (e) { throw e; }
    }

    async deleteFunder (funderId) {
        try {
            await funder.delete(funderId); 
        } catch (e) { throw e; }
    }

    async updateFunder (funderId, name, email) {
        try {
            await funder.updateFunder(funderId, name, email); 
        } catch (e) { throw e; }
    }
};

module.exports = new FunderServices;