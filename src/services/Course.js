const course = require('../models/Course');

class CourseServices {
    constructor () {
        if (!CourseServices.instance) {
            CourseServices.instance = this;
        }

        return CourseServices.instance;
    }

    async addCourse (name, code, modules) {
        await course.add({
            name,
            code,
            modules
        });
    }

    async getCourses () {
        return await course.getCourses(); 
    }
};

module.exports = new CourseServices;