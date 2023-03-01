import fetch from "../helpers/fetch";
import { formatCourses, formatSelect } from "../helpers/formater";

class CourseAuth {
    constructor () {
        if (!CourseAuth.instance) {
            CourseAuth.instance = this;
        }

        return CourseAuth.instance;
    }

    async add () {
        const name = $('#course-name').val(),
            code = $('#course-code').val(),
            modules = [];

        Array.from($('.modules__item')).forEach(_module => {
            modules.push(_module.value);
        });

        const response = await fetch('/courses/add', {
            body: {
                name,
                code,
                modules
            }
        });

        if (response.successful) {
            location.reload(true);
        }
    }

    async getCourses () {
        const response = await fetch('/courses/fetch');

        $('#course-module-1').html(formatSelect((await fetch('/modules/fetch')).modules));

        return formatCourses(response.courses);
    }
}

export default new CourseAuth;