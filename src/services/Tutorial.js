const tutorial = require('../models/Tutorial');

const v = require('../helpers/Validation');


class TutorialServices {
    constructor () {
        if (!TutorialServices.instance) {
            TutorialServices.instance = this;
        }

        return TutorialServices.instance;
    }

    async addTutorial({ link, description, module: _module, lecturer}) {
        if (_module == 'select')
            throw 'Please select module';

        v.validate({
            'Link': { value: link, min: 3, max: 120 },
            'Description': { value: description, min: 6, max: 35 }
        });

        await tutorial.add({
            link,
            description,
            moduleID: _module,
            lecturerID: lecturer
        });
    }

    async getTutorial (tutorialId) {
        return await tutorial.getTutorial(tutorialId); 
    }

    async getLecturerTutorials (lecturerId) {
        return await tutorial.getLecturerTutorials(lecturerId)
    }

    async getStudentTutorials (modules) {
        const tutorials = [];

        for (let i = 0; i < modules.length; i++) {
            const _tutorials = await tutorial.getByModule(modules[i]); 

            for (let j = 0; j < _tutorials.length; j++) {
                tutorials.push(_tutorials[j]);
            }
        }

        return tutorials;
    }

    async searchLecturerTutorials (query, lecturerId) {
        let tutorials = [];

        try {
            (await tutorial.searchLecturerTutorials(query, lecturerId)).forEach(_tutorial => {
                tutorials.push(_tutorial);
            })

            return tutorials;
        } catch (e) { throw e; }
    }

    async deleteTutorial (tutorialId) {
        try {
            await tutorial.delete(tutorialId);
        } catch (e) { throw e; }
    }
};

module.exports = new TutorialServices;