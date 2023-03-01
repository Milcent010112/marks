const goal = require('../models/Goal');
const grade = require('../models/Grade');
const _module = require('../models/Module');
const student = require('../models/Student');

class GoalServices {
    constructor() {
        if (!GoalServices.instance) {
            GoalServices.instance = this;
        }

        return GoalServices.instance;
    }

    async addGoal({ studentId, studentNumber, goal: studentGoal, moduleId }) {
        try {
            const moduleDetails = await _module.getModule(moduleId);

            if (await goal.exists({ studentID: studentId, moduleID: moduleId }))
                throw `A goal for module: ${moduleDetails.name} has already been set`;

            if (await student.exists({ _id: studentId, isDeleted: true }))
                throw `Student: ${studentNumber} no longer exists`;

            await goal.add({
                studentID: studentId,
                studentNumber,
                moduleID: moduleId,
                goal: studentGoal
            });
        } catch (e) { throw e; }
    }

    async getGoals (studentId) {
        try {
            return await goal.getGoals(studentId);
        } catch (e) { throw e; }
    }

    async getAll () {
        try {
            return await goal.getAll();
        } catch (e) { throw e; }
    }

    async searchAdminGoals (query) {
        let goals = [];

        try {
            const advanced = query.split(':')

            if (!(advanced[0] && advanced[0] == 'filter' && advanced[1])) {
                const modules = await _module.searchAdminModules(query);

                for (let i = 0; i < modules.length; i++) {
                    let _goals = await goal.getGoalsByModule(modules[i]._id);

                    _goals.forEach(_grade => {
                        goals.push(_grade);
                    })
                }

                const students = await student.searchAdminStudents(query);

                for (let i = 0; i < students.length; i++) {
                    let _goals = await goal.getGoals(students[i]._id);

                    _goals.forEach(_goal => {
                        goals.push(_goal);
                    })
                }

                return goals;
            } else {
                const goals = await goal.getAll()
                const goalsToReturn = []

                for (let i = 0; i < goals.length; i++) {
                    const studentGrades = await grade.getGradesByStudent(goals[i].studentID._id)
                    let finalGrade = 0;

                    for (let j = 0; j < studentGrades.length; j++) {
                        if (String(goals[i].moduleID._id) != String(studentGrades[j].testID.moduleID._id))
                            continue;

                        finalGrade += studentGrades[j].actualGrade * (studentGrades[j].testID.weight / 100)
                    }

                    if (finalGrade >= goals[i].goal && advanced[1] == 'reached')
                        goalsToReturn.push(goals[i])

                    if (finalGrade < goals[i].goal && advanced[1] == 'failed')
                        goalsToReturn.push(goals[i])
                }

                return goalsToReturn;
            }
            
        } catch (e) { throw e; }
    }

    async deleteGoal (goalId) {
        try {
            return await goal.delete(goalId);
        } catch (e) { throw e; }
    }
};

module.exports = new GoalServices;