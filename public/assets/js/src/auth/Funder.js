import fetch from "../helpers/fetch";
import { isAlpha, isEmail } from "../helpers/validation";
import { formatFunders } from "../helpers/formater";
import showError from "../helpers/show-error"

class FunderAuth {
    constructor() {
        if (!FunderAuth.instance) {
            FunderAuth.instance = this;
        }

        return FunderAuth.instance;
    }

    async addFunder () {
        const name = $('#funder-name').val(),
            email = $('#funder-email').val();

        try {
            if (!isEmail(email))
                throw 'Funder email is invalid';

            const response = await fetch('/funders/add', { body: { name, email } });

            if (response.successful) 
                return location.reload(true);

        } catch (e) { showError('new-funder-error', e) }
    }

    async getAll () {
        const response = await fetch('/funders/fetch/all');

        if (response.funders && response.funders.length > 0) {
            $('#registered-funders').show()
            $('#no-funders').hide()


            return formatFunders(response.funders);
        }

        $('#no-funders').show()
    }

    async search (searchValue) {
        const response = await fetch(`/funders/search?q=${searchValue}`);

        if (response.funders && response.funders.length > 0) {
            $('#registered-funders').show()
            $('#no-funders').hide()
            
            return formatFunders(response.funders);
        }

        $('#registered-funders').hide()
        $('#no-funders').show()
    }

    async getFunderDetails (funderId) {
        return (await fetch(`/funder/${funderId}/fetch`)).funder;
    }

    async deleteFunder (funderId) {
        const response = await fetch(`/funder/${funderId}/delete`);

        if (response.successful)
            return location.reload(true);
    }

    async updateFunder (funderId) {
        const name = $('#edit-funder-name').val(),
            email = $('#edit-funder-email').val()

        try {
            if (!isAlpha(name))
                throw 'Funder name must not contain any special characters or numbers';

            if (!isEmail(email))
                throw 'Funder email is invalid';

            const response = await fetch(`/funder/${funderId}/update`, { body: { name, email } });

            if (response.successful) 
                return location.reload(true);

        } catch (e) { showError('edit-funder-error', e) }
    }
}

export default new FunderAuth;