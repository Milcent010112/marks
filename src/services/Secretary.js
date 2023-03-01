const secretary = require('../models/Secretary');
const Hasher = require('../helpers/Hasher'); 

const jwt = require('../helpers/Jwt')
const v = require('../helpers/Validation');

class SecretaryServices {
    constructor () {
        if (!SecretaryServices.instance) {
            SecretaryServices.instance = this;
        }

        return SecretaryServices.instance;
    }

    async signIn({ email, password }) {
        try {
            const secretaryDetails = await secretary.fetchByEmail(email);

            v.validate({
                'Email address': { value: email, min: 5, max: 30 },
                'Password': { value: password, min: 8, max: 16 }
            });

            if (!secretaryDetails)
                throw 'Email address or password is incorrect!';

            if (!(await Hasher.isSame(secretaryDetails.password, password)))
                throw 'Email address or password is incorrect!';

            delete secretaryDetails.password;

            const jwtAccess = jwt.getAccessToken(secretaryDetails.toJSON());

            const jwtRefresh = jwt.getRefreshToken(secretaryDetails.toJSON());

            // refreshToken.add({ token: jwtRefresh });

            let redirect = '/d/tests';

            return {
                tokens: { jwtAccess, jwtRefresh },
                redirect
            };
        } catch (e) { throw e; }
    };

    async addSecretary ({ firstname, lastname, email }) {
        const password = await Hasher.hash('Password123');

        v.validate({
            'First name': { value: firstname, min: 4, max: 20 },
            'Last name': { value: lastname, min: 3, max: 20 },
            'Email address': { value: email, min: 5, max: 30 }
        });

        await secretary.add({
            firstname,
            lastname,
            email,
            password
        });
    }

    async getSecretaries () {
        return await secretary.getSecretaries(); 
    }

    async searchAdminSecretaries (query) {
        return await secretary.searchAdminSecretaries(query); 
    }
};

module.exports = new SecretaryServices;