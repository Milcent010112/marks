import { getStaticDate } from "./date";

export const formatModules = (modules, tools = true) => {
    let formated = '', count = 1;

    const edts = tools ? `
        <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
            <button class="btn table__body__row__item__get-student-goal-report">Get report</button>
            <button class="btn table__body__row__item__edit">Edit</button>
            <button class="btn table__body__row__item__delete">Delete</button>
        </li>
    ` : `
        <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
            <button class="btn table__body__row__item__get-student-goal-report">Get report</button>
        </li>
    `

    modules.forEach(_module => {
        formated += `
            <ul class="table__body__row module-item" data-moduleid="${_module._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${_module.name}</li>
                <li class="table__body__row__item">${_module.code}</li>
                <li class="table__body__row__item last-cell">${ getStaticDate(new Date(_module.createdAt)) }</li>
                ${edts}
            </ul>
        `;

        count++;
    });

    return formated;
}

// in use
export const formatTestsStudent = ({tests, grades}) => {
    let formated = '', count = 1, average = 0;

    const sortedTests = {};

    tests.forEach(test => {
        console.log(sortedTests[test.moduleID.name], test.moduleID.name);
        sortedTests[test.moduleID.name] = 
            sortedTests[test.moduleID.name] ? sortedTests[test.moduleID.name] : [];

        sortedTests[test.moduleID.name].push(test)
    });

    for (const moduleName in sortedTests) {
        let index = 'start';

        sortedTests[moduleName].forEach(test => {
            average += grades[count - 1].value || 0;

            formated += `
                <ul class="table__body__row test-record" data-testId="${test._id}">
                    <li class="table__body__row__item short">${count}</li>
                    <li class="table__body__row__item">${index == 'start' ? test.moduleID.name : ''}</li>
                    <li class="table__body__row__item">${test.name}</li>
                    <li class="table__body__row__item">${grades[count - 1].value || 'Not graded'}</li>
                    <li class="table__body__row__item">${test.weight}</li>
                    <li class="table__body__row__item last-cell">${getStaticDate(new Date(test.createdAt))}</li>
                </ul>
            `;

            count++;
            index = 'end'
        });
    }

    average = average == 'NaN' ? 0 : average; 

    $('#average-grade').text(parseInt(average / (count - 1 || 1)));

    return formated;
}

// in use
export const formatTestsLecturer = (tests) => {
    let formated = '', count = 1;
    
    tests.forEach(test => {
        let status = '<li class="table__body__row__item last-cell">No action required</li>';
        
        if (test.publishRequest) status = '<li class="table__body__row__item table__body__row__item__publish last-cell">Publish requested</li>';
        else if (test.deleteRequest) status = '<li class="table__body__row__item table__body__row__item__delete last-cell">Delete requested</li>';

        formated += `
            <ul class="table__body__row test-record" data-testId="${test._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${test.moduleID.name}</li>
                <li class="table__body__row__item">${test.name}</li>
                <li class="table__body__row__item">${test.weight}</li>
                ${status}
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn table__body__row__item__delete">Delete</button>
                </li>
            </ul>
        `;

        count++;
    });

    return formated;
}

// in use
export const formatTestsSecretary = (tests) => {
    let formated = '', count = 1;

    tests.forEach(test => {
        let action = '<li class="table__body__row__item last-cell">No action required</li>';

        if (test.publishRequest) action = '<li class="table__body__row__item table__body__row__item__publish last-cell">Process publish</li>';
        else if (test.deleteRequest) action = '<li class="table__body__row__item table__body__row__item__delete last-cell">Process delete</li>';

        formated += `
            <ul class="table__body__row test-record" data-testId=${test._id}>
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${test.moduleID.name}</li>
                <li class="table__body__row__item">${test.name}</li>
                <li class="table__body__row__item">${test.weight}</li>
                ${action}
            </ul>
        `;

        count++;
    });

    return formated;
}

// in use
export const formatTestsAdmin = (tests) => {
    let formated = '', count = 1;

    tests.forEach(test => {
        let action = '<li class="table__body__row__item last-cell">No action required</li>';

        if (test.publishRequest) action = '<li class="table__body__row__item table__body__row__item__publish last-cell">Process publish</li>';
        else if (test.deleteRequest) action = '<li class="table__body__row__item table__body__row__item__delete last-cell">Process delete</li>';

        formated += `
            <ul class="table__body__row test-record" data-testId=${test._id}>
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${test.lecturerID.firstname + ' ' + test.lecturerID.lastname}</li>
                <li class="table__body__row__item">${test.name}</li>
                <li class="table__body__row__item">${test.moduleID.name}</li>
                <li class="table__body__row__item">${test.weight}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(test.createdAt)) }</li>
            </ul>
        `;

        count++;
    });

    return formated;
}

export const formatGoals = (goals) => {
    let formated = '', count = 1, result;

    goals.forEach(goal => {
        formated += `
            <ul class="table__body__row goal-record" data-goalid="${goal._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${goal.moduleID.name}</li>
                <li class="table__body__row__item last-cell">${goal.goal}</li>
            </ul>
        `;

        count++;
    });

    return formated;
}

export const formatAdminGoals = (goals) => {
    let formated = '', count = 1;

    goals.forEach(goal => {
        formated += `
            <ul class="table__body__row goal-record student-record" data-studentId="${goal.studentID._id}" data-goalid="${goal._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${goal.moduleID.name}</li>
                <li class="table__body__row__item">${goal.studentID.firstname + ' ' + goal.studentID.lastname}</li>
                <li class="table__body__row__item">${goal.goal}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(goal.createdAt)) }</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn btn--primary table__body__row__item__report">Get report</button>
                    <button class="btn table__body__row__item__delete">Delete</button>
                </li>
            </ul>
        `;

        count++;
    });

    return formated;
}

export const formatStudents = (students) => {
    let formated = '', count = 1;

    students.forEach(student => {
        formated += `
            <ul class="table__body__row student-record" data-studentId="${student._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${student.firstname}</li>
                <li class="table__body__row__item">${student.lastname}</li>
                <li class="table__body__row__item">${student.studentNumber}</li>
                <li class="table__body__row__item">${student.email}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(student.createdAt)) }</li>
            </ul>
        `;

        count++;
    });

    return formated;
}

// in use
export const formatStudentsAdmin = (students) => {
    let formated = '', count = 1;

    students.forEach(student => {
        formated += `
            <ul class="table__body__row student-record" data-studentId="${student._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${student.firstname}</li>
                <li class="table__body__row__item">${student.lastname}</li>
                <li class="table__body__row__item">${student.studentNumber}</li>
                <li class="table__body__row__item">${student.email}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(student.createdAt)) }</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn btn--primary table__body__row__item__report">Get report</button>
                    <button class="btn table__body__row__item__edit">Edit</button>
                    <button class="btn table__body__row__item__delete">Delete</button>
                </li>
            </ul>
        `;

        count++;
    });

    return formated;
}

export const formatCourses = (courses) => {
    let formated = '', count = 1;

    courses.forEach(course => {
        formated += `
            <ul class="table__body__row">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${course.name}</li>
                <li class="table__body__row__item">${course.code}</li>
                <li class="table__body__row__item">${course.modules.length}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(course.createdAt)) }</li>
            </ul>
        `;

        count++;
    });

    return formated;
}

export const formatLecturers = (lecturers) => {
    let formated = '', count = 1;

    lecturers.forEach(lecturer => {
        formated += `
            <ul class="table__body__row" data-lecturerid="${lecturer._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${lecturer.firstname}</li>
                <li class="table__body__row__item">${lecturer.lastname}</li>
                <li class="table__body__row__item">${lecturer.email}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(lecturer.createdAt)) }</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn table__body__row__item__edit">Edit</button>
                    <button class="btn table__body__row__item__delete">Delete</button>
                </li>
            </ul>
        `;

        count++;
    });

    return formated;
}

export const formatSecretaries = (secretaries) => {
    let formated = '', count = 1;

    secretaries.forEach(secretary => {
        formated += `
            <ul class="table__body__row">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${secretary.firstname}</li>
                <li class="table__body__row__item">${secretary.lastname}</li>
                <li class="table__body__row__item">${secretary.email}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(secretary.createdAt)) }</li>
            </ul>
        `;

        count++;
    });

    return formated;
}

// in use 
export const formatStudentsGradesLecturer = (grades) => {
    let formated = '', count = 1;

    grades.forEach(grade => {
        let status = 'Published';

        if (grade.publishRequest) status = 'Publish requested';
        else if (grade.deleteRequest) status = 'Delete requested';

        formated += `
            <ul class="table__body__row" data-gradeid="${grade._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${grade.studentID.studentNumber}</li>
                <li class="table__body__row__item">${grade.studentID.lastname}</li>
                <li class="table__body__row__item">${grade.testID.name}</li>
                <li class="table__body__row__item">${grade.actualGrade}</li>
                <li class="table__body__row__item last-cell">${status}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn table__body__row__item__edit">Edit</button>
                    <button class="btn table__body__row__item__delete">Delete</button>
                </li>
            </ul>
        `;

        count++;
    });

    return formated;
}

// in use 
export const formatStudentsGradesSecretary = (grades) => {
    let formated = '', count = 1;

    
    grades.forEach(grade => {
        let action = '<li class="table__body__row__item last-cell">No action required</li>';

        if (grade.publishRequest) action = '<li class="table__body__row__item table__body__row__item__publish last-cell">Process publish</li>';
        else if (grade.deleteRequest) action = '<li class="table__body__row__item table__body__row__item__delete last-cell">Process delete</li>';
        else if (grade.editRequest) action = '<li class="table__body__row__item table__body__row__item__edit last-cell">Process edit</li>';

        formated += `
            <ul class="table__body__row" data-gradeid="${grade._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${grade.studentID.studentNumber}</li>
                <li class="table__body__row__item">${grade.studentID.lastname}</li>
                <li class="table__body__row__item">${grade.testID.name}</li>
                <li class="table__body__row__item">${grade.actualGrade}</li>
                ${action}
            </ul>
        `;

        count++;
    });

    return formated;
}

export const formatStudentsGradesAdmin = (grades, codes) => {
    let formated = '', count = 1;

    grades.forEach(grade => {
        formated += `
            <ul class="table__body__row" data-gradeid="${grade._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${codes[count - 1].code}</li>
                <li class="table__body__row__item">${grade.testID.name}</li>
                <li class="table__body__row__item">${grade.studentID.firstname +' '+ grade.studentID.lastname}</li>
                <li class="table__body__row__item last-cell">${grade.actualGrade}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn table__body__row__item__delete">Delete</button>
                </li>
            </ul>
        `;

        count++;
    });

    return formated;
}

// in use 
export const formatFunders = (funders) => {
    let formated = '', count = 1;


    funders.forEach(funder => {
        formated += `
            <ul class="table__body__row" data-funderid="${funder._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${funder.name}</li>
                <li class="table__body__row__item">${funder.email}</li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(funder.createdAt)) }<li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn table__body__row__item__edit">edit</button>
                    <button class="btn table__body__row__item__delete">delete</button>
                </li>
            </ul>
        `;

        count++;
    });

    return formated;
}

// in use 
export const formatLecturerTutorials = (tutorials) => {
    let formated = '', count = 1;

    tutorials.forEach(tutorial => {
        formated += `
            <ul class="table__body__row" data-tutorialid="${tutorial._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${tutorial.moduleID.name}</li>
                <li class="table__body__row__item">${tutorial.description}</li>
                <li class="table__body__row__item"><a href="${tutorial.link}">${tutorial.link}</a></li>
                <li class="table__body__row__item last-cell">${getStaticDate(new Date(tutorial.createdAt)) }<li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn table__body__row__item__delete">delete</button>
                </li>
            </ul>
        `;

        count++;
    });

    return formated;
}

// in use 
export const formatStudentTutorials = (tutorials) => {
    let formated = '', count = 1;

    tutorials.forEach(tutorial => {
        formated += `
            <ul class="table__body__row" data-tutorialid="${tutorial._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${tutorial.moduleID.name}</li>
                <li class="table__body__row__item">${tutorial.description}</li>
                <li class="table__body__row__item"><a href="${tutorial.link}">${tutorial.link}</a></li>
            </ul>
        `;

        count++;
    });

    return formated;
}

export const formatProgress = (modules) => {
    let formated = '', count = 1;

    for (let moduleName in modules) {
        if (!modules.hasOwnProperty(moduleName))
            continue;

        let gradeNeeded = modules[moduleName].finalGrade < 50 ? 
            (50 - modules[moduleName].finalGrade):
            0

        let toGoal = modules[moduleName].goal - modules[moduleName].finalGrade

        toGoal = toGoal > 0 ? toGoal : 0

        formated += `
            <ul class="table__body__row module-item">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${moduleName}</li>
                <li class="table__body__row__item">${modules[moduleName].perc}%</li>
                <li class="table__body__row__item">${100 - modules[moduleName].perc}%</li>
                <li class="table__body__row__item">${modules[moduleName].goal ? modules[moduleName].goal + '%' : 'Not set'}</li>
                <li class="table__body__row__item">${modules[moduleName].finalGrade.toFixed(2)}%</li>
                <li class="table__body__row__item last-cell">${toGoal.toFixed(2)}%</li>
            </ul>
        `;

        count++;
    }

    return formated;
}

export const formatSelect = (modules) => {
    let formated = '<option value="select">Select</option>';

    let temp = [], dic = {}

    modules.forEach(_module => {
        dic[_module.name] = _module._id
        temp.push(_module.name)
    })

    temp.sort().forEach(_module => {
        formated += `<option value="${dic[_module]}">${_module}</option>`;
    });

    return formated;
}