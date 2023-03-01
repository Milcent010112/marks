const Model = require('../Model');

class Goal extends Model {
    constructor(mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            studentID: { type: mongoose.Schema.ObjectId, required: true, ref: 'Student' },
            studentNumber: { type: String, required: true },
            moduleID: { type: mongoose.Schema.ObjectId, required: true, ref: 'Module' },
            goal: { type: Number, required: true },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Goal', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    getAll = (select = '') => this.model.find({
        condition: { isDeleted: false },
        populate: [['studentID', 'firstname lastname'], ['moduleID', 'name']],
        select
    });

    getGoals = (studentId, select = '') => this.model.find({
        condition: { studentID: studentId, isDeleted: false },
        populate: [['studentID', 'firstname lastname'], ['moduleID', 'name']],
        select
    });

    getGoalByStudent = (studentId, moduleId, select = '') => this.model.findOne({
        condition: { studentID: studentId, moduleID: moduleId, isDeleted: false },
        populate: [['studentID', 'firstname lastname'], ['moduleID', 'name']],
        select
    });

    getGoalsByModule = (moduleId, select = '') => this.model.find({
        condition: { moduleID: moduleId, isDeleted: false },
        populate: [['studentID', 'firstname lastname'], ['moduleID', 'name']],
        select
    });

    updateGoal = (studentId, testGrade) => this.model.updateOne(
        { studentID: studentId },
        { testGrade }
    );
};

module.exports = Goal;