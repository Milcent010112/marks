const admin = require('../models/Admin');

const v = require('../helpers/Validation');
const jwt = require('../helpers/Jwt')

const hasher = require('../helpers/Hasher');

class AdminServices {
    constructor () {
        if (!AdminServices.instance) {
            AdminServices.instance = this;
        }

        return AdminServices.instance;
    }

    async signIn ({email, password}) {
        try {
            // validate user input
            v.validate({
                'Email address': { value: email, min: 5, max: 30 },
                'Password': { value: password, min: 8, max: 16 }
            });

            // get admin details using, their email
            const adminDetails = await admin.fetchByEmail(email);

            // if admin does not exist, throw error
            if (!adminDetails)
                throw 'Email address or password is incorrect!';

            // if password provided by user, does not match one in the database, throw error
            if (!(await hasher.isSame(adminDetails.password, password)))
                throw 'Email address or password is incorrect!';

            // remove password, so it does not get saved on a cookie
            delete adminDetails.password;

            // session token
            const jwtAccess = jwt.getAccessToken(adminDetails.toJSON());

            // session token
            const jwtRefresh = jwt.getRefreshToken(adminDetails.toJSON());

            let redirect = '/a/modules';

            return {
                tokens: { jwtAccess, jwtRefresh },
                redirect
            };
        } catch (e) { throw e; }
    };
};

module.exports = new AdminServices;