import fetch from "../helpers/fetch";
import {
    formatLecturerTutorials,
    formatStudentTutorials,
    formatSelect
} from "../helpers/formater";
import { isSpecialChar, isNumber } from "../helpers/validation";
import showError from "../helpers/show-error";

class TutorialAuth {
    constructor() {
        if (!TutorialAuth.instance) {
            TutorialAuth.instance = this;
        }

        return TutorialAuth.instance;
    }

    async addTutorial() {
        const link = $('#tutorial-link').val(),
            description = $('#tutorial-description').val(),
            module = $('#tutorial-module').val();

        try {
            const response = await fetch('/tutorials/add', {
                body: {
                    link,
                    description,
                    module
                }
            });

            if (response.successful)
                return location.reload(true);

            throw response.error;
        } catch (e) { showError('new-tutorial-error', e) }
    }

    async deleteTutorial (tutorialId) {
        try {
            const response = await fetch(`/tutorial/${tutorialId}/delete`);

            if (response.successful)
                return location.reload(true);

        } catch (e) { }
    }


    async getLecturerTutorials () {
        const response = await fetch('/tutorials/fetch/lecturer');

        $('#tutorial-module').html(formatSelect((await fetch('/lecturer/fetch/modules')).modules));

        if (response.tutorials && response.tutorials.length > 0) {
            $('#student-tutorials').show()
            $('#no-student-tutorials').hide()

            return formatLecturerTutorials(response.tutorials);
        }

        $('#student-tutorials').hide()
        $('#no-student-tutorials').show()
    }

    async searchLecturerTutorials (searchValue) {
        const response = await fetch(`/tutorials/search/lecturer?q=${searchValue}`);

        if (response.tutorials && response.tutorials.length > 0) {
            $('#student-tutorials').show()
            $('#no-student-tutorials').hide()
            
            return formatLecturerTutorials(response.tutorials);
        }

        $('#student-tutorials').hide()
        $('#no-student-tutorials').show()
    }

    async getStudentTutorials () {
        const response = await fetch('/tutorials/fetch/student');

        if (response.tutorials && response.tutorials.length > 0)
            return formatStudentTutorials(response.tutorials);

        $('#no-tutorials').show();
    }
}

export default new TutorialAuth;