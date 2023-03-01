import fetch from "../helpers/fetch";
import { isNumber } from "../helpers/validation";
import { formatGoals, formatAdminGoals, formatSelect } from "../helpers/formater";
import showError from "../helpers/show-error";

class GoalAuth {
    constructor() {
        if (!GoalAuth.instance) {
            GoalAuth.instance = this;
        }

        return GoalAuth.instance;
    }

    async add () {
        const goal = $('#goal').val(),
            moduleId = $('#goal-module').val();

        try {
            if (!isNumber(goal))
                throw 'Test goal must a number';

            const response = await fetch('/goals/add', { body: { goal, moduleId } });

            if (response.successful)
                return location.reload(true);

            throw response.error;
        } catch (e) { showError('new-goal-error', e) }
    }

    async getGoals () {
        const response = await fetch('/goals/fetch');

        $('#goal-module').html(formatSelect((await fetch('/modules/fetch/student')).modules));

        if (response.goals && response.goals.length > 0)
            return formatGoals(response.goals);

        $('#no-student-goals').show()
    }

    async getAll () {
        const response = await fetch('/goals/fetch/all');

        if (response.goals && response.goals.length > 0) {
            $('#student-goals').show()
            $('#no-goals').hide()

            return formatAdminGoals(response.goals);
        }

        $('#student-goals').hide()
        $('#no-goals').show()
    }

    async searchAdminGoals (searchValue) {
        const response = await fetch(`/goals/search/admin?q=${searchValue}`);

        if (response.goals && response.goals.length > 0) {
            $('#student-goals').show()
            $('#no-goals').hide()
            
            return formatAdminGoals(response.goals);
        }

        $('#student-goals').hide()
        $('#no-goals').show()
    }

    async deleteGoal (goalId) {
        const response = await fetch(`/goal/${goalId}/delete`);

        if (response.successful) {
            location.reload(true);
        }
    }
}

export default new GoalAuth;