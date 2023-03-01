import fetch from "../helpers/fetch";
import {
    isWhitespace, hasNumbers, isSpecialChar
} from "../helpers/validation";
import { formatModules } from "../helpers/formater";
import showError from "../helpers/show-error";

class ModuleAuth {
    constructor () {
        if (!ModuleAuth.instance) {
            ModuleAuth.instance = this;
        }

        return ModuleAuth.instance;
    }

    async add () {
        const name = $('#module-name').val(),
            code = $('#module-code').val();

        try {
            if (hasNumbers(name) || isSpecialChar(name))
                throw 'Name cannot contain numbers or special characters';

            if (isWhitespace(code))
                throw 'Code cannot contain any whitespaces';

            const response = await fetch('/modules/add', {
                body: {
                    name,
                    code
                }
            });

            if (response.successful) 
                return location.reload(true);

            throw response.error
        } catch (e) { showError('new-module-modal-error', e); }
    }

    async getModules () {
        const response = await fetch('/modules/fetch');

        if (response.modules && response.modules.length > 0) {
            $('#registered-modules').show()
            $('#no-registered-modules').hide()

            return formatModules(response.modules);
        }

        $('#registered-modules').hide()
        $('#no-registered-modules').show()
    }

    async getStudentGoalReport (moduleId) {
        try {
            const response = await fetch(`/module/${moduleId}/student/goal`);

            if (response.reportFile) {
                const reportLink = $('#report-link')[0];

                reportLink.href = `/assets/downloads/tmp/${response.reportFile}`;

                reportLink.click();
            }
        } catch (error) {  }
    }

    async searchAdminModules (searchValue) {
        const response = await fetch(`/modules/search/admin?q=${searchValue}`);

        if (response.modules && response.modules.length > 0) {
            $('#registered-modules').show()
            $('#no-registered-modules').hide()
            
            return formatModules(response.modules);
        }

        $('#registered-modules').hide()
        $('#no-registered-modules').show()
    }

    async getModuleDetails (moduleId) {
        const response = await fetch(`/module/${moduleId}/fetch`);

        return response.module;
    }

    async deleteModule (moduleId) {
        const response = await fetch(`/module/${moduleId}/delete`);

        if (response.successful)
            location.reload(true);
    }

    async editModule (moduleId) {
        const response = await fetch(`/module/${moduleId}/edit`, {
            body: {
                code: $('#edit-module-code').val(),
                name: $('#edit-module-name').val()
            }
        });

        if (response.successful) 
            return location.reload(true);
    }
}

export default new ModuleAuth;