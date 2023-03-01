const lecturer = require('../models/Lecturer');
const Hasher = require('../helpers/Hasher');

const jwt = require('../helpers/Jwt')
const v = require('../helpers/Validation');

class LecturerServices {
    constructor () {
        if (!LecturerServices.instance) {
            LecturerServices.instance = this;
        }

        return LecturerServices.instance;
    }

    async addLecturer({ firstname, lastname, modules, email, password, passwordAgain }) {
        try {
            v.validate({
                'First name': { value: firstname, min: 3, max: 30 },
                'Last name': { value: lastname, min: 3, max: 30 },
                'Email address': { value: email, min: 5, max: 30 },
                'Password': { value: password, min: 8, max: 16 },
                'Password confirmation': { value: passwordAgain, min: 8, max: 16, is: ['Password', 'Passwords do not match'] }
            });

            if (await lecturer.exists({ email }))
                throw `A lecturer with the email: ${email} exists already `;

            await lecturer.add({
                firstname,
                lastname,
                email,
                modules,
                password: await Hasher.hash(password)
            });

            const lecturerDetails = await lecturer.getByEmail(email, '-password')

            const jwtAccess = jwt.getAccessToken(lecturerDetails.toJSON());

            const jwtRefresh = jwt.getRefreshToken(lecturerDetails.toJSON());

            // refreshToken.add({ token: jwtRefresh });

            let redirect = '/l/modules';

            return {
                tokens: { jwtAccess, jwtRefresh },
                redirect
            };
        } catch (e) { throw e; }
    }

    async getLecturers () {
        return await lecturer.getLecturers(); 
    }

    async searchAdminLecturers (query) {
        try {
            return await lecturer.searchAdminLecturers(query); 
        } catch (e) { throw e; }
    }

    async signIn ({email, password}) {
        try {
            v.validate({
                'Email address': { value: email, min: 5, max: 30 },
                'Password': { value: email, min: 5, max: 30 }
            });

            const lecturerDetails = await lecturer.getByEmail(email);

            if (!lecturerDetails)
                throw 'Email address or password is incorrect!';
                
            if (!(await Hasher.isSame(lecturerDetails.password, password)))
                throw 'Email address or password is incorrect!';

            delete lecturerDetails.password;

            const jwtAccess = jwt.getAccessToken(lecturerDetails.toJSON());

            const jwtRefresh = jwt.getRefreshToken(lecturerDetails.toJSON());

            // refreshToken.add({ token: jwtRefresh });

            let redirect = '/l/modules';

            return {
                tokens: { jwtAccess, jwtRefresh },
                redirect
            };
        } catch (e) { throw e; }
    }

    async getLecturer (lecturerId) {
        return await lecturer.getLecturer(lecturerId); 
    }

    async deleteLecturer (lecturerId) {
        return await lecturer.delete(lecturerId); 
    }

    async editLecturer (lecturerId, lecturerDetails) {
        return await lecturer.editLecturer(lecturerId, lecturerDetails); 
    }
};

module.exports = new LecturerServices;