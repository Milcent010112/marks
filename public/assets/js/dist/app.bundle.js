/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/assets/js/src/auth/Admin.js":
/*!********************************************!*\
  !*** ./public/assets/js/src/auth/Admin.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");



class AdminAuth {
  constructor() {
    if (!AdminAuth.instance) {
      AdminAuth.instance = this;
    }

    return AdminAuth.instance;
  }

  async signIn() {
    const email = $('#email-address').val(),
          password = $('#password').val();
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/admin/sign-in', {
      body: {
        email,
        password
      }
    });

    if (response.successful) {
      location.href = response.redirect;
      return;
    }

    (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_1__["default"])('sign-in-error', response.error);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new AdminAuth());

/***/ }),

/***/ "./public/assets/js/src/auth/Funder.js":
/*!*********************************************!*\
  !*** ./public/assets/js/src/auth/Funder.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formater */ "./public/assets/js/src/helpers/formater.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");





class FunderAuth {
  constructor() {
    if (!FunderAuth.instance) {
      FunderAuth.instance = this;
    }

    return FunderAuth.instance;
  }

  async addFunder() {
    const name = $('#funder-name').val(),
          email = $('#funder-email').val();

    try {
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_1__.isEmail)(email)) throw 'Funder email is invalid';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/funders/add', {
        body: {
          name,
          email
        }
      });
      if (response.successful) return location.reload(true);
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('new-funder-error', e);
    }
  }

  async getAll() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/funders/fetch/all');

    if (response.funders && response.funders.length > 0) {
      $('#registered-funders').show();
      $('#no-funders').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_2__.formatFunders)(response.funders);
    }

    $('#no-funders').show();
  }

  async search(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/funders/search?q=${searchValue}`);

    if (response.funders && response.funders.length > 0) {
      $('#registered-funders').show();
      $('#no-funders').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_2__.formatFunders)(response.funders);
    }

    $('#registered-funders').hide();
    $('#no-funders').show();
  }

  async getFunderDetails(funderId) {
    return (await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/funder/${funderId}/fetch`)).funder;
  }

  async deleteFunder(funderId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/funder/${funderId}/delete`);
    if (response.successful) return location.reload(true);
  }

  async updateFunder(funderId) {
    const name = $('#edit-funder-name').val(),
          email = $('#edit-funder-email').val();

    try {
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_1__.isAlpha)(name)) throw 'Funder name must not contain any special characters or numbers';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_1__.isEmail)(email)) throw 'Funder email is invalid';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/funder/${funderId}/update`, {
        body: {
          name,
          email
        }
      });
      if (response.successful) return location.reload(true);
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('edit-funder-error', e);
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new FunderAuth());

/***/ }),

/***/ "./public/assets/js/src/auth/Goal.js":
/*!*******************************************!*\
  !*** ./public/assets/js/src/auth/Goal.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formater */ "./public/assets/js/src/helpers/formater.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");





class GoalAuth {
  constructor() {
    if (!GoalAuth.instance) {
      GoalAuth.instance = this;
    }

    return GoalAuth.instance;
  }

  async add() {
    const goal = $('#goal').val(),
          moduleId = $('#goal-module').val();

    try {
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_1__.isNumber)(goal)) throw 'Test goal must a number';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/goals/add', {
        body: {
          goal,
          moduleId
        }
      });
      if (response.successful) return location.reload(true);
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('new-goal-error', e);
    }
  }

  async getGoals() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/goals/fetch');
    $('#goal-module').html((0,_helpers_formater__WEBPACK_IMPORTED_MODULE_2__.formatSelect)((await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/modules/fetch/student')).modules));
    if (response.goals && response.goals.length > 0) return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_2__.formatGoals)(response.goals);
    $('#no-student-goals').show();
  }

  async getAll() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/goals/fetch/all');

    if (response.goals && response.goals.length > 0) {
      $('#student-goals').show();
      $('#no-goals').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_2__.formatAdminGoals)(response.goals);
    }

    $('#student-goals').hide();
    $('#no-goals').show();
  }

  async searchAdminGoals(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/goals/search/admin?q=${searchValue}`);

    if (response.goals && response.goals.length > 0) {
      $('#student-goals').show();
      $('#no-goals').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_2__.formatAdminGoals)(response.goals);
    }

    $('#student-goals').hide();
    $('#no-goals').show();
  }

  async deleteGoal(goalId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/goal/${goalId}/delete`);

    if (response.successful) {
      location.reload(true);
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new GoalAuth());

/***/ }),

/***/ "./public/assets/js/src/auth/Grade.js":
/*!********************************************!*\
  !*** ./public/assets/js/src/auth/Grade.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/formater */ "./public/assets/js/src/helpers/formater.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");





class GradeAuth {
  constructor() {
    if (!GradeAuth.instance) {
      GradeAuth.instance = this;
    }

    return GradeAuth.instance;
  }

  async add() {
    const studentNumber = $('#student-number').val(),
          testGrade = $('#test-grade').val(),
          testId = $('#student-test').val();

    try {
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isNumber)(testGrade)) throw 'Grade must be a number';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/grades/add', {
        body: {
          studentNumber,
          testGrade,
          testId
        }
      });
      if (response.successful) return location.reload(true);
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('new-student-grade-error', e);
    }
  }

  async getGrades() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/grades/fetch');
    $('#test-id').html((0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatSelect)((await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/tests/fetch/lecturer')).tests));
    if (response.grades && response.grades.length > 0) return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatStudentsGradesLecturer)(response.grades);
    $('#no-student-grades').show();
  }

  async getAll() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/grades/fetch/all');

    if (response.grades && response.grades.length > 0) {
      $('#student-grades').show();
      $('#no-grades').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatStudentsGradesAdmin)(response.grades, response.moduleCodes);
    }

    $('#student-grades').hide();
    $('#no-grades').show();
  }

  async getSecretaryGrades() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/grades/fetch/secretary');
    if (response.grades && response.grades.length > 0) return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatStudentsGradesSecretary)(response.grades);
    $('#no-student-grades').show();
  }

  async searchAdminGrades(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/grades/search/admin?q=${searchValue}`);

    if (response.grades && response.grades.length > 0) {
      $('#student-grades').show();
      $('#no-grades').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatStudentsGradesAdmin)(response.grades, response.moduleCodes);
    }

    $('#student-grades').hide();
    $('#no-grades').show();
  }

  async searchLecturerGrades(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/grades/search/lecturer?q=${searchValue}`);

    if (response.grades && response.grades.length > 0) {
      $('#students-grades').show();
      $('#no-student-grades').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatStudentsGradesLecturer)(response.grades);
    }

    $('#students-grades').hide();
    $('#no-student-grades').show();
  }

  async publishGrade(gradeId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/grade/${gradeId}/publish`);

    if (response.successful) {
      location.reload(true);
    }
  }

  async deleteGrade(gradeId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/grade/${gradeId}/delete`);

    if (response.successful) {
      location.reload(true);
    }
  }

  async requestDeletion(gradeId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/grade/${gradeId}/delete-request`);

    if (response.successful) {
      location.reload(true);
    }
  }

  async editGrade(gradeId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/grade/${gradeId}/edit`, {
      body: {
        grade: $('#edt-test-grade').val()
      }
    });

    if (response.successful) {
      location.reload(true);
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new GradeAuth());

/***/ }),

/***/ "./public/assets/js/src/auth/Lecturer.js":
/*!***********************************************!*\
  !*** ./public/assets/js/src/auth/Lecturer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/formater */ "./public/assets/js/src/helpers/formater.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");





class LecturerAuth {
  constructor() {
    if (!LecturerAuth.instance) {
      LecturerAuth.instance = this;
    }

    return LecturerAuth.instance;
  }

  async add() {
    const firstname = $('#lecturer-first-name').val(),
          lastname = $('#lecturer-last-name').val(),
          email = $('#lecturer-email').val(),
          password = $('#lecturer-password').val(),
          passwordAgain = $('#lecturer-con-password').val(),
          modules = [];
    Array.from($('.modules__item')).forEach(_module => {
      modules.push(_module.value);
    });

    try {
      if (modules.includes('select')) throw 'Please select a module';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isAlpha)(firstname)) throw 'First name cannot contain special characters or white space or numbers';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isAlpha)(lastname)) throw 'Last name cannot contain special characters or white space or numbers';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isEmail)(email)) throw 'Email address is invalid';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/lecturers/add', {
        body: {
          firstname,
          lastname,
          email,
          modules,
          password,
          passwordAgain
        }
      });
      if (response.successful) return location.href = response.redirect;
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('new-lecturer-modal-error', e);
    }
  }

  async signIn() {
    const email = $('#email-address').val(),
          password = $('#password').val();
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/lecturer/sign-in', {
      body: {
        email,
        password
      }
    });

    if (response.successful) {
      location.href = response.redirect;
      return;
    }

    (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('sign-in-error', response.error);
  }

  async getLecturers() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/lecturers/fetch'); // $('#lecturer-module-1').html(formatSelect((await fetch('/modules/fetch')).modules));

    if (response.lecturers && response.lecturers.length > 0) {
      $('#registered-lecturers').show();
      $('#no-registered-lecturers').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatLecturers)(response.lecturers);
    }

    $('#registered-lecturers').hide();
    $('#no-registered-lecturers').show();
  }

  async searchAdminLecturers(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/lecturers/search/admin?q=${searchValue}`);

    if (response.lecturers && response.lecturers.length > 0) {
      $('#registered-lecturers').show();
      $('#no-registered-lecturers').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatLecturers)(response.lecturers);
    }

    $('#registered-lecturers').hide();
    $('#no-registered-lecturers').show();
  }

  async getModules() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/lecturer/fetch/modules');
    return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatModules)(response.modules, false);
  }

  async getLecturerDetails(lecturerId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/lecturer/${lecturerId}/fetch`);
    return response.lecturer;
  }

  async deleteLecturer(lecturerId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/lecturer/${lecturerId}/delete`);
    if (response.successful) location.reload(true);
  }

  async editLecturer(lecturerId) {
    const firstname = $('#edit-lecturer-first-name').val(),
          lastname = $('#edit-lecturer-last-name').val(),
          email = $('#edit-lecturer-email').val();

    try {
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isAlpha)(firstname)) throw 'First name cannot contain special characters or white space or numbers';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isAlpha)(lastname)) throw 'Last name cannot contain special characters or white space or numbers';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isEmail)(email)) throw 'Email address is invalid';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/lecturer/${lecturerId}/edit`, {
        body: {
          firstname,
          lastname,
          email
        }
      });
      if (response.successful) return location.reload(true);
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('edit-lecturer-modal-error', e);
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new LecturerAuth());

/***/ }),

/***/ "./public/assets/js/src/auth/Module.js":
/*!*********************************************!*\
  !*** ./public/assets/js/src/auth/Module.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formater */ "./public/assets/js/src/helpers/formater.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");





class ModuleAuth {
  constructor() {
    if (!ModuleAuth.instance) {
      ModuleAuth.instance = this;
    }

    return ModuleAuth.instance;
  }

  async add() {
    const name = $('#module-name').val(),
          code = $('#module-code').val();

    try {
      if ((0,_helpers_validation__WEBPACK_IMPORTED_MODULE_1__.hasNumbers)(name) || (0,_helpers_validation__WEBPACK_IMPORTED_MODULE_1__.isSpecialChar)(name)) throw 'Name cannot contain numbers or special characters';
      if ((0,_helpers_validation__WEBPACK_IMPORTED_MODULE_1__.isWhitespace)(code)) throw 'Code cannot contain any whitespaces';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/modules/add', {
        body: {
          name,
          code
        }
      });
      if (response.successful) return location.reload(true);
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('new-module-modal-error', e);
    }
  }

  async getModules() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/modules/fetch');

    if (response.modules && response.modules.length > 0) {
      $('#registered-modules').show();
      $('#no-registered-modules').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_2__.formatModules)(response.modules);
    }

    $('#registered-modules').hide();
    $('#no-registered-modules').show();
  }

  async getStudentGoalReport(moduleId) {
    try {
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/module/${moduleId}/student/goal`);

      if (response.reportFile) {
        const reportLink = $('#report-link')[0];
        reportLink.href = `/assets/downloads/tmp/${response.reportFile}`;
        reportLink.click();
      }
    } catch (error) {}
  }

  async searchAdminModules(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/modules/search/admin?q=${searchValue}`);

    if (response.modules && response.modules.length > 0) {
      $('#registered-modules').show();
      $('#no-registered-modules').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_2__.formatModules)(response.modules);
    }

    $('#registered-modules').hide();
    $('#no-registered-modules').show();
  }

  async getModuleDetails(moduleId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/module/${moduleId}/fetch`);
    return response.module;
  }

  async deleteModule(moduleId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/module/${moduleId}/delete`);
    if (response.successful) location.reload(true);
  }

  async editModule(moduleId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/module/${moduleId}/edit`, {
      body: {
        code: $('#edit-module-code').val(),
        name: $('#edit-module-name').val()
      }
    });
    if (response.successful) return location.reload(true);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ModuleAuth());

/***/ }),

/***/ "./public/assets/js/src/auth/Progress.js":
/*!***********************************************!*\
  !*** ./public/assets/js/src/auth/Progress.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/formater */ "./public/assets/js/src/helpers/formater.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new class ProgressAuth {
  constructor() {
    if (!ProgressAuth.instance) {
      ProgressAuth.instance = this;
    }

    return ProgressAuth.instance;
  }

  async getProgress() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/progress/fetch');
    if (response.progress) return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatProgress)(response.progress);
    $('#no-student-progress').show();
  }

  async downloadReport() {
    try {
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/progress/download-report`);

      if (response.progressFile) {
        const progressLink = $('#progress-report-link')[0];
        progressLink.href = `/assets/downloads/tmp/${response.progressFile}`;
        progressLink.click();
      }
    } catch (error) {}
  }

}());

/***/ }),

/***/ "./public/assets/js/src/auth/Secretary.js":
/*!************************************************!*\
  !*** ./public/assets/js/src/auth/Secretary.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/formater */ "./public/assets/js/src/helpers/formater.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");





class SecretaryAuth {
  constructor() {
    if (!SecretaryAuth.instance) {
      SecretaryAuth.instance = this;
    }

    return SecretaryAuth.instance;
  }

  async add() {
    const firstname = $('#secretary-first-name').val(),
          lastname = $('#secretary-last-name').val(),
          email = $('#secretary-email').val();

    try {
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isAlpha)(firstname)) throw 'First name cannot contain special characters or white space or numbers';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isAlpha)(lastname)) throw 'Last name cannot contain special characters or white space or numbers';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isEmail)(email)) throw 'Email address is invalid';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/secretaries/add', {
        body: {
          firstname,
          lastname,
          email
        }
      });
      if (response.successful) return location.reload(true);
      return response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('new-secretary-error', e);
    }
  }

  async signIn() {
    const email = $('#email-address').val(),
          password = $('#password').val();
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/secretary/sign-in', {
      body: {
        email,
        password
      }
    });

    if (response.successful) {
      location.href = response.redirect;
      return;
    }

    (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('sign-in-error', response.error);
  }

  async searchAdminSecretaries(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/secretaries/search/admin?q=${searchValue}`);

    if (response.secretaries && response.secretaries.length > 0) {
      $('#registered-secretaries').show();
      $('#no-registered-secretaries').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatSecretaries)(response.secretaries);
    }

    $('#registered-secretaries').hide();
    $('#no-registered-secretaries').show();
  }

  async getSecretaries() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/secretaries/fetch');

    if (response.secretaries && response.secretaries.length > 0) {
      $('new-secretary-btn').attr('disabled', true);
      $('#registered-secretaries').show();
      $('#no-registered-secretaries').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatSecretaries)(response.secretaries);
    }

    $('#registered-secretaries').hide();
    $('#no-registered-secretaries').show();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new SecretaryAuth());

/***/ }),

/***/ "./public/assets/js/src/auth/Student.js":
/*!**********************************************!*\
  !*** ./public/assets/js/src/auth/Student.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/formater */ "./public/assets/js/src/helpers/formater.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");





class StudentAuth {
  constructor() {
    if (!StudentAuth.instance) {
      StudentAuth.instance = this;
    }

    return StudentAuth.instance;
  }

  async add() {
    const firstname = $('#student-first-name').val(),
          lastname = $('#student-last-name').val(),
          studentNumber = $('#student-number').val(),
          password = $('#student-password').val(),
          passwordAgain = $('#student-con-password').val(),
          email = $('#student-email').val(),
          funder = $('#student-funder').val(),
          modules = [];
    Array.from($('.modules__item')).forEach(_module => {
      modules.push(_module.value);
    });

    try {
      if (modules.includes('select')) throw 'Please select a module';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isAlpha)(firstname)) throw 'First name cannot contain special characters or white space or numbers';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isAlpha)(lastname)) throw 'Last name cannot contain special characters or white space or numbers';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isNumber)(studentNumber)) throw 'Student number must be a number';
      if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isEmail)(email)) throw 'Email address is invalid';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/students/add', {
        body: {
          firstname,
          lastname,
          studentNumber,
          email,
          modules,
          funder,
          password,
          passwordAgain
        }
      });
      if (response.successful) return location.href = response.redirect;
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('new-student-error', e);
    }
  }

  async updateStudent() {
    const firstname = $('#edit-student-first-name').val(),
          lastname = $('#edit-student-last-name').val(),
          email = $('#edit-student-email').val();
    if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isAlpha)(firstname)) throw 'First name cannot contain special characters or white space or numbers';
    if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isAlpha)(lastname)) throw 'Last name cannot contain special characters or white space or numbers';
    if (!(0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isEmail)(email)) throw 'Email address is invalid';

    try {
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/student/${$('#student-update-id').val()}/update`, {
        body: {
          firstname,
          lastname,
          email
        }
      });
      if (response.successful) return location.reload();
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('edit-student-error', e);
    }
  }

  async deleteStudent(studentId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/student/${studentId}/delete`);
    if (response.successful) return location.reload();
  }

  async downloadReport(studentId) {
    try {
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/student/${studentId}/download-report`);

      if (response.reportFile) {
        const reportLink = $('#student-report-link')[0];
        reportLink.href = `/assets/downloads/tmp/${response.reportFile}`;
        reportLink.click();
      }
    } catch (error) {}
  }

  async signIn() {
    const email = $('#email-address').val(),
          password = $('#password').val();
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/student/sign-in', {
      body: {
        email,
        password
      }
    });

    if (response.successful) {
      location.href = response.redirect;
      return;
    }

    (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('sign-in-error', response.error);
  }

  async getStudents() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/students/fetch'); // $('#student-module-1').html(formatSelect((await fetch('/modules/fetch')).modules));
    // $('#student-funder').html(formatSelect((await fetch('/funders/fetch/all')).funders));

    if (response.students && response.students.length > 0) {
      $('#registered-students').show();
      $('#no-registered-students').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatStudentsAdmin)(response.students);
    }

    $('#registered-students').hide();
    $('#no-registered-students').show();
  }

  async getModuleStudents() {
    const pagePath = location.pathname.split('/');
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/students/fetch/module/${pagePath[pagePath.length - 2]}`);
    $('#student-test').html((0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatSelect)((await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/tests/fetch/module', {
      body: {
        moduleId: pagePath[pagePath.length - 2]
      }
    })).tests));
    return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatStudents)(response.students);
  }

  async searchAdminStudents(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/students/search/admin?q=${searchValue}`);

    if (response.students && response.students.length > 0) {
      $('#registered-students').show();
      $('#no-registered-students').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatStudentsAdmin)(response.students);
    }

    $('#registered-students').hide();
    $('#no-registered-students').show();
  }

  async endSemester() {
    try {
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/students/end-semester`);
    } catch (error) {}
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new StudentAuth());

/***/ }),

/***/ "./public/assets/js/src/auth/Test.js":
/*!*******************************************!*\
  !*** ./public/assets/js/src/auth/Test.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/formater */ "./public/assets/js/src/helpers/formater.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");





class TestAuth {
  constructor() {
    if (!TestAuth.instance) {
      TestAuth.instance = this;
    }

    return TestAuth.instance;
  }

  async addTest() {
    const name = $('#test-name').val(),
          module = $('#test-module').val();

    try {
      if ((0,_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.isSpecialChar)(name)) throw 'Test name cannot contain any special characters';
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/tests/add', {
        body: {
          name,
          module
        }
      });
      if (response.successful) return location.reload(true);
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('new-test-error', e);
    }
  }

  async getTestDetails(testId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/test/fetch/${testId}`);
    return response.test;
  }

  async getStudentTests() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/tests/fetch/student');

    if (response.tests && response.tests.length > 0) {
      $('#student-tests').show();
      $('#no-student-tests').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatTestsStudent)(response);
    }

    $('#student-tests').hide();
    $('#no-student-tests').show();
  }

  async getLecturerTests() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/tests/fetch/lecturer');
    $('#test-module').html((0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatSelect)((await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/lecturer/fetch/modules')).modules));

    if (response.tests && response.tests.length > 0) {
      $('#tests-and-exams').show();
      $('#no-tests-and-exams').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatTestsLecturer)(response.tests);
    }

    $('#tests-and-exams').hide();
    $('#no-tests-and-exams').show();
  }

  async getSecretaryTests() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/tests/fetch/secretary');
    if (response.tests && response.tests.length > 0) return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatTestsSecretary)(response.tests);
    $('#no-student-tests').show();
  }

  async getAdminTests() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/tests/fetch/all');

    if (response.tests && response.tests.length > 0) {
      $('#tests').show();
      $('#no-tests').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatTestsAdmin)(response.tests);
    }

    $('#tests').hide();
    $('#no-tests').show();
  }

  async searchAdminTests(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/tests/search/admin?q=${searchValue}`);

    if (response.tests && response.tests.length > 0) {
      $('#tests').show();
      $('#no-tests').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatTestsAdmin)(response.tests);
    }

    $('#tests').hide();
    $('#no-tests').show();
  }

  async searchLecturerTests(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/tests/search/lecturer?q=${searchValue}`);

    if (response.tests && response.tests.length > 0) {
      $('#tests-and-exams').show();
      $('#no-tests-and-exams').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatTestsLecturer)(response.tests);
    }

    $('#tests-and-exams').hide();
    $('#no-tests-and-exams').show();
  }

  async searchStudentTests(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/tests/search/student?q=${searchValue}`);

    if (response.tests && response.tests.length > 0) {
      $('#student-tests').show();
      $('#no-student-tests').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatTestsStudent)(response);
    }

    $('#student-tests').hide();
    $('#no-student-tests').show();
  }

  async deleteTest(testId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/test/${testId}/delete`);

    if (response.successful) {
      location.reload(true);
    }
  }

  async publishTest(testId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/test/${testId}/publish`);

    if (response.successful) {
      location.reload(true);
    }
  }

  async requestDeletion(testId) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/test/${testId}/delete-request`);

    if (response.successful) {
      location.reload(true);
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new TestAuth());

/***/ }),

/***/ "./public/assets/js/src/auth/Tutorial.js":
/*!***********************************************!*\
  !*** ./public/assets/js/src/auth/Tutorial.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/formater */ "./public/assets/js/src/helpers/formater.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/validation */ "./public/assets/js/src/helpers/validation.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");





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
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/tutorials/add', {
        body: {
          link,
          description,
          module
        }
      });
      if (response.successful) return location.reload(true);
      throw response.error;
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_3__["default"])('new-tutorial-error', e);
    }
  }

  async deleteTutorial(tutorialId) {
    try {
      const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/tutorial/${tutorialId}/delete`);
      if (response.successful) return location.reload(true);
    } catch (e) {}
  }

  async getLecturerTutorials() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/tutorials/fetch/lecturer');
    $('#tutorial-module').html((0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatSelect)((await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/lecturer/fetch/modules')).modules));

    if (response.tutorials && response.tutorials.length > 0) {
      $('#student-tutorials').show();
      $('#no-student-tutorials').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatLecturerTutorials)(response.tutorials);
    }

    $('#student-tutorials').hide();
    $('#no-student-tutorials').show();
  }

  async searchLecturerTutorials(searchValue) {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(`/tutorials/search/lecturer?q=${searchValue}`);

    if (response.tutorials && response.tutorials.length > 0) {
      $('#student-tutorials').show();
      $('#no-student-tutorials').hide();
      return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatLecturerTutorials)(response.tutorials);
    }

    $('#student-tutorials').hide();
    $('#no-student-tutorials').show();
  }

  async getStudentTutorials() {
    const response = await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])('/tutorials/fetch/student');
    if (response.tutorials && response.tutorials.length > 0) return (0,_helpers_formater__WEBPACK_IMPORTED_MODULE_1__.formatStudentTutorials)(response.tutorials);
    $('#no-tutorials').show();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new TutorialAuth());

/***/ }),

/***/ "./public/assets/js/src/events/admin/funders.js":
/*!******************************************************!*\
  !*** ./public/assets/js/src/events/admin/funders.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Funder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Funder */ "./public/assets/js/src/auth/Funder.js");
/* harmony import */ var _helpers_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/modal */ "./public/assets/js/src/helpers/modal.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'admin-funders') return;
  $(() => {
    (async () => {
      $('#new-funder-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Funder__WEBPACK_IMPORTED_MODULE_0__["default"].addFunder();
      });
      $('#registered-funders').html(await _auth_Funder__WEBPACK_IMPORTED_MODULE_0__["default"].getAll());
      $('#funders-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#registered-funders').html(await _auth_Funder__WEBPACK_IMPORTED_MODULE_0__["default"].getAll());
        $('#registered-funders').html(await _auth_Funder__WEBPACK_IMPORTED_MODULE_0__["default"].search(searchValue));
      });
      $('.table__body__row__item__delete').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        await _auth_Funder__WEBPACK_IMPORTED_MODULE_0__["default"].deleteFunder(target.dataset.funderid);
      });
      $('.table__body__row__item__edit').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        const funderDetails = await _auth_Funder__WEBPACK_IMPORTED_MODULE_0__["default"].getFunderDetails(target.dataset.funderid);
        $('#funder-id').val(funderDetails._id);
        $('#edit-funder-name').val(funderDetails.name);
        $('#edit-funder-email').val(funderDetails.email);
        (0,_helpers_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('edit-funder');
      });
      $('#edit-funder-form').on('submit', async e => {
        await _auth_Funder__WEBPACK_IMPORTED_MODULE_0__["default"].updateFunder($('#funder-id').val());
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/goals.js":
/*!****************************************************!*\
  !*** ./public/assets/js/src/events/admin/goals.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Goal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Goal */ "./public/assets/js/src/auth/Goal.js");
/* harmony import */ var _auth_Student__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../auth/Student */ "./public/assets/js/src/auth/Student.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'admin-goals') return;
  $(() => {
    (async () => {
      $('#student-goals').html(await _auth_Goal__WEBPACK_IMPORTED_MODULE_0__["default"].getAll());
      $('#goals-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#student-goals').html(await _auth_Goal__WEBPACK_IMPORTED_MODULE_0__["default"].getAll());
        $('#student-goals').html(await _auth_Goal__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminGoals(searchValue));
      });
      $('.table__body__row__item__report').on('click', async e => {
        await _auth_Student__WEBPACK_IMPORTED_MODULE_1__["default"].downloadReport(e.currentTarget.parentElement.parentElement.dataset.studentid);
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/grades.js":
/*!*****************************************************!*\
  !*** ./public/assets/js/src/events/admin/grades.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Grade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Grade */ "./public/assets/js/src/auth/Grade.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'admin-grades') return;
  $(() => {
    (async () => {
      $('#student-grades').html(await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].getAll());
      $('#grades-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#student-grades').html(await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].getAll());
        $('#student-grades').html(await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminGrades(searchValue));
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/index.js":
/*!****************************************************!*\
  !*** ./public/assets/js/src/events/admin/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sign_in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sign-in */ "./public/assets/js/src/events/admin/sign-in.js");
/* harmony import */ var _semester__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./semester */ "./public/assets/js/src/events/admin/semester.js");
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules */ "./public/assets/js/src/events/admin/modules.js");
/* harmony import */ var _funders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./funders */ "./public/assets/js/src/events/admin/funders.js");
/* harmony import */ var _students__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./students */ "./public/assets/js/src/events/admin/students.js");
/* harmony import */ var _lecturers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lecturers */ "./public/assets/js/src/events/admin/lecturers.js");
/* harmony import */ var _secretaries__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./secretaries */ "./public/assets/js/src/events/admin/secretaries.js");
/* harmony import */ var _goals__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./goals */ "./public/assets/js/src/events/admin/goals.js");
/* harmony import */ var _grades__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./grades */ "./public/assets/js/src/events/admin/grades.js");
/* harmony import */ var _tests__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tests */ "./public/assets/js/src/events/admin/tests.js");










/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  (0,_sign_in__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_semester__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_funders__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_students__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_lecturers__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_secretaries__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_goals__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_grades__WEBPACK_IMPORTED_MODULE_8__["default"])();
  (0,_tests__WEBPACK_IMPORTED_MODULE_9__["default"])();
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/lecturers.js":
/*!********************************************************!*\
  !*** ./public/assets/js/src/events/admin/lecturers.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Lecturer */ "./public/assets/js/src/auth/Lecturer.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'admin-lecturers') return;
  $(() => {
    (async () => {
      $('#registered-lecturers').html(await _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__["default"].getLecturers());
      $('#lecturers-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#registered-lecturers').html(await _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__["default"].getLecturers());
        $('#registered-lecturers').html(await _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminLecturers(searchValue));
      });
      $('.table__body__row__item__delete').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        await _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__["default"].deleteLecturer(target.dataset.lecturerid);
      }); // $('.table__body__row__item__edit').on('click', async e => {
      //     const target = e.currentTarget.parentElement.parentElement;
      //     const lecturerDetails = await lecturerAuth.getLecturerDetails(target.dataset.lecturerid);
      //     $('#edit-lecturer-id').val(lecturerDetails._id)
      //     $('#edit-lecturer-first-name').val(lecturerDetails.firstname)
      //     $('#edit-lecturer-last-name').val(lecturerDetails.lastname)
      //     $('#edit-lecturer-email').val(lecturerDetails.email)
      //     openModal('edit-lecturer');
      // });
      // $('#edit-lecturer-form').on('submit', async e => {
      //     await lecturerAuth.editLecturer($('#edit-lecturer-id').val());
      // });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/modules.js":
/*!******************************************************!*\
  !*** ./public/assets/js/src/events/admin/modules.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Module */ "./public/assets/js/src/auth/Module.js");
/* harmony import */ var _helpers_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/modal */ "./public/assets/js/src/helpers/modal.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'admin-modules') return;
  $(() => {
    (async () => {
      $('#new-module-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Module__WEBPACK_IMPORTED_MODULE_0__["default"].add();
      });
      $('#registered-modules').html(await _auth_Module__WEBPACK_IMPORTED_MODULE_0__["default"].getModules());
      $('#modules-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#registered-modules').html(await _auth_Module__WEBPACK_IMPORTED_MODULE_0__["default"].getModules());
        $('#registered-modules').html(await _auth_Module__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminModules(searchValue));
      });
      $('.table__body__row__item__get-student-goal-report').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        await _auth_Module__WEBPACK_IMPORTED_MODULE_0__["default"].getStudentGoalReport(target.dataset.moduleid);
      });
      $('.table__body__row__item__delete').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        await _auth_Module__WEBPACK_IMPORTED_MODULE_0__["default"].deleteModule(target.dataset.moduleid);
      });
      $('.table__body__row__item__edit').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        const moduleDetails = await _auth_Module__WEBPACK_IMPORTED_MODULE_0__["default"].getModuleDetails(target.dataset.moduleid);
        $('#edit-module-id').val(moduleDetails._id);
        $('#edit-module-code').val(moduleDetails.code);
        $('#edit-module-name').val(moduleDetails.name);
        (0,_helpers_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('edit-module');
      });
      $('#edit-module-form').on('submit', async e => {
        await _auth_Module__WEBPACK_IMPORTED_MODULE_0__["default"].editModule($('#edit-module-id').val());
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/secretaries.js":
/*!**********************************************************!*\
  !*** ./public/assets/js/src/events/admin/secretaries.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Secretary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Secretary */ "./public/assets/js/src/auth/Secretary.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'admin-secretaries') return;
  $(() => {
    (async () => {
      $('#new-secretary-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Secretary__WEBPACK_IMPORTED_MODULE_0__["default"].add();
      });
      $('#registered-secretaries').html(await _auth_Secretary__WEBPACK_IMPORTED_MODULE_0__["default"].getSecretaries());
      $('#secretaries-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#registered-secretaries').html(await _auth_Secretary__WEBPACK_IMPORTED_MODULE_0__["default"].getSecretaries());
        $('#registered-secretaries').html(await _auth_Secretary__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminSecretaries(searchValue));
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/semester.js":
/*!*******************************************************!*\
  !*** ./public/assets/js/src/events/admin/semester.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Student__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Student */ "./public/assets/js/src/auth/Student.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'admin-semester') return;
  $(() => {
    (async () => {
      $('#end-semester-btn').on('click', async e => {
        await _auth_Student__WEBPACK_IMPORTED_MODULE_0__["default"].endSemester();
        e.currentTarget.disabled = true;
        setTimeout(() => e.currentTarget.disabled = false, 1000);
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/sign-in.js":
/*!******************************************************!*\
  !*** ./public/assets/js/src/events/admin/sign-in.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Admin */ "./public/assets/js/src/auth/Admin.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'admin-sign-in') return;
  $(() => {
    (async () => {
      console.log('Hey');
      $('#admin-sign-in-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Admin__WEBPACK_IMPORTED_MODULE_0__["default"].signIn();
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/students.js":
/*!*******************************************************!*\
  !*** ./public/assets/js/src/events/admin/students.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Student__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Student */ "./public/assets/js/src/auth/Student.js");
/* harmony import */ var _helpers_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/modal */ "./public/assets/js/src/helpers/modal.js");
/* harmony import */ var _helpers_add_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/add-module */ "./public/assets/js/src/helpers/add-module.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'admin-students') return;
  $(() => {
    (async () => {
      // $('#new-student-form').on('submit', async (e) => {
      //     e.preventDefault();
      //     await studentAuth.add();
      // });
      $('#registered-students').html(await _auth_Student__WEBPACK_IMPORTED_MODULE_0__["default"].getStudents());
      $('#students-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#registered-students').html(await _auth_Student__WEBPACK_IMPORTED_MODULE_0__["default"].getStudents());
        $('#registered-students').html(await _auth_Student__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminStudents(searchValue));
      }); // $('#add-module-item-btn').on('click', () => {
      //     createModuleItem('student');
      // });
      // $('#delete-item-1').on('click', () => {
      //     removeModuleItem(1, 'student');
      // })

      $('.table__body__row__item__report').on('click', async e => {
        await _auth_Student__WEBPACK_IMPORTED_MODULE_0__["default"].downloadReport(e.currentTarget.parentElement.parentElement.dataset.studentid);
      });
      $('.table__body__row__item__edit').on('click', e => {
        const studentDetails = $('.table__body__row__item', e.currentTarget.parentElement.parentElement);
        $('#student-update-id').val(e.currentTarget.parentElement.parentElement.dataset.studentid);
        $('#edit-student-first-name').val(studentDetails[1].innerText);
        $('#edit-student-last-name').val(studentDetails[2].innerText);
        $('#edit-student-number').val(studentDetails[3].innerText);
        $('#edit-student-email').val(studentDetails[4].innerText);
        (0,_helpers_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('edit-student');
      });
      $('.table__body__row__item__delete').on('click', async e => {
        await _auth_Student__WEBPACK_IMPORTED_MODULE_0__["default"].deleteStudent(e.currentTarget.parentElement.parentElement.dataset.studentid);
      });
      $('#edit-student-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Student__WEBPACK_IMPORTED_MODULE_0__["default"].updateStudent();
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/admin/tests.js":
/*!****************************************************!*\
  !*** ./public/assets/js/src/events/admin/tests.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Test */ "./public/assets/js/src/auth/Test.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'admin-tests') return;
  $(() => {
    (async () => {
      $('#tests').html(await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].getAdminTests());
      $('#tests-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#tests').html(await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].getAdminTests());
        $('#tests').html(await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].searchAdminTests(searchValue));
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/index.js":
/*!**********************************************!*\
  !*** ./public/assets/js/src/events/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin */ "./public/assets/js/src/events/admin/index.js");
/* harmony import */ var _secretary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./secretary */ "./public/assets/js/src/events/secretary/index.js");
/* harmony import */ var _lecturer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lecturer */ "./public/assets/js/src/events/lecturer/index.js");
/* harmony import */ var _student__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./student */ "./public/assets/js/src/events/student/index.js");
/* harmony import */ var _sign_in__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sign-in */ "./public/assets/js/src/events/sign-in.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  (0,_admin__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_secretary__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_lecturer__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_student__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_sign_in__WEBPACK_IMPORTED_MODULE_4__["default"])();
});

/***/ }),

/***/ "./public/assets/js/src/events/lecturer/grades.js":
/*!********************************************************!*\
  !*** ./public/assets/js/src/events/lecturer/grades.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Grade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Grade */ "./public/assets/js/src/auth/Grade.js");
/* harmony import */ var _helpers_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/modal */ "./public/assets/js/src/helpers/modal.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'lecturer-grades') return;
  $(() => {
    (async () => {
      // $('#new-grade-form').on('submit', async (e) => {
      //     e.preventDefault();
      //     await gradeAuth.add();
      // });
      $('#students-grades').html(await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].getGrades());
      $('#grades-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#students-grades').html(await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].getGrades());
        $('#students-grades').html(await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].searchLecturerGrades(searchValue));
      });
      $('.table__body__row__item__delete').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].deleteGrade(target.dataset.gradeid);
      });
      $('.table__body__row__item__edit').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        const table = $('.table__body__row__item', e.currentTarget.parentElement.parentElement);
        $('#edt-student-number').val(table[1].innerText);
        $('#edt-test-name').val(table[3].innerText);
        (0,_helpers_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('edit-grade');
        $('#edit-grade-form').on('submit', async e => {
          e.preventDefault();
          await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].editGrade(target.dataset.gradeid);
        });
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/lecturer/index.js":
/*!*******************************************************!*\
  !*** ./public/assets/js/src/events/lecturer/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sign_in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sign-in */ "./public/assets/js/src/events/lecturer/sign-in.js");
/* harmony import */ var _sign_up__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign-up */ "./public/assets/js/src/events/lecturer/sign-up.js");
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules */ "./public/assets/js/src/events/lecturer/modules.js");
/* harmony import */ var _students__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./students */ "./public/assets/js/src/events/lecturer/students.js");
/* harmony import */ var _tests_exams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tests-exams */ "./public/assets/js/src/events/lecturer/tests-exams.js");
/* harmony import */ var _grades__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./grades */ "./public/assets/js/src/events/lecturer/grades.js");
/* harmony import */ var _tutorials__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tutorials */ "./public/assets/js/src/events/lecturer/tutorials.js");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  (0,_sign_in__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_sign_up__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_students__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_tests_exams__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_grades__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_tutorials__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

/***/ }),

/***/ "./public/assets/js/src/events/lecturer/modules.js":
/*!*********************************************************!*\
  !*** ./public/assets/js/src/events/lecturer/modules.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Lecturer */ "./public/assets/js/src/auth/Lecturer.js");
/* harmony import */ var _auth_Module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../auth/Module */ "./public/assets/js/src/auth/Module.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'lecturer-modules') return;
  $(() => {
    (async () => {
      $('#assigned-modules').html(await _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__["default"].getModules());
      $('.module-item').on('click', e => {
        const moduleItem = e.currentTarget;
        location.href = `/l/module/${moduleItem.dataset.moduleid}/students`;
      });
      $('.table__body__row__item__get-student-goal-report').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        await _auth_Module__WEBPACK_IMPORTED_MODULE_1__["default"].getStudentGoalReport(target.dataset.moduleid);
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/lecturer/sign-in.js":
/*!*********************************************************!*\
  !*** ./public/assets/js/src/events/lecturer/sign-in.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Lecturer */ "./public/assets/js/src/auth/Lecturer.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'lecturer-sign-in') return;
  $(() => {
    (async () => {
      $('#lecturer-sign-in-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__["default"].signIn();
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/lecturer/sign-up.js":
/*!*********************************************************!*\
  !*** ./public/assets/js/src/events/lecturer/sign-up.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Lecturer */ "./public/assets/js/src/auth/Lecturer.js");
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_add_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/add-module */ "./public/assets/js/src/helpers/add-module.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers/formater */ "./public/assets/js/src/helpers/formater.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'lecturer-sign-up') return;
  $(() => {
    (async () => {
      $('#lecturer-module-1').html((0,_helpers_formater__WEBPACK_IMPORTED_MODULE_3__.formatSelect)((await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_1__["default"])('/modules/fetch')).modules));
      $('#sign-in-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Lecturer__WEBPACK_IMPORTED_MODULE_0__["default"].add();
      });
      $('#add-module-item-btn').on('click', () => {
        (0,_helpers_add_module__WEBPACK_IMPORTED_MODULE_2__.createModuleItem)('lecturer');
      });
      $('#delete-item-1').on('click', () => {
        (0,_helpers_add_module__WEBPACK_IMPORTED_MODULE_2__.removeModuleItem)(1, 'lecturer');
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/lecturer/students.js":
/*!**********************************************************!*\
  !*** ./public/assets/js/src/events/lecturer/students.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Student__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Student */ "./public/assets/js/src/auth/Student.js");
/* harmony import */ var _auth_Grade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../auth/Grade */ "./public/assets/js/src/auth/Grade.js");
/* harmony import */ var _auth_Module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth/Module */ "./public/assets/js/src/auth/Module.js");
/* harmony import */ var _helpers_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers/modal */ "./public/assets/js/src/helpers/modal.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'lecturer-students') return;
  $(() => {
    (async () => {
      $('#assigned-students').html(await _auth_Student__WEBPACK_IMPORTED_MODULE_0__["default"].getModuleStudents());
      $('.student-record').on('click', async e => {
        const studentId = e.currentTarget.dataset.studentid;
        const pagePath = location.pathname.split('/');
        const moduleDetails = await _auth_Module__WEBPACK_IMPORTED_MODULE_2__["default"].getModuleDetails(pagePath[pagePath.length - 2]);
        $('#student-number').val($('.table__body__row__item', e.currentTarget)[3].innerText);
        $('#test-module').val(moduleDetails.name);
        $('#test-module-id').val(moduleDetails._id);
        (0,_helpers_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('new-student-grade');
      });
      $('#new-student-grade-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Grade__WEBPACK_IMPORTED_MODULE_1__["default"].add();
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/lecturer/tests-exams.js":
/*!*************************************************************!*\
  !*** ./public/assets/js/src/events/lecturer/tests-exams.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Test */ "./public/assets/js/src/auth/Test.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'lecturer-tests-and-exams') return;
  $(() => {
    (async () => {
      $('#tests-and-exams').html(await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].getLecturerTests());
      $('#tests-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#tests-and-exams').html(await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].getLecturerTests());
        $('#tests-and-exams').html(await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].searchLecturerTests(searchValue));
      });
      $('#new-test-form').on('submit', async e => {
        e.preventDefault();
        _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].addTest();
      });
      $('.table__body__row__item__delete').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].deleteTest(target.dataset.testid);
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/lecturer/tutorials.js":
/*!***********************************************************!*\
  !*** ./public/assets/js/src/events/lecturer/tutorials.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Tutorial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Tutorial */ "./public/assets/js/src/auth/Tutorial.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'lecturer-tutorials') return;
  $(() => {
    (async () => {
      $('#student-tutorials').html(await _auth_Tutorial__WEBPACK_IMPORTED_MODULE_0__["default"].getLecturerTutorials());
      $('#new-tutorial-form').on('submit', async e => {
        e.preventDefault();
        _auth_Tutorial__WEBPACK_IMPORTED_MODULE_0__["default"].addTutorial();
      });
      $('#tutorials-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#student-tutorials').html(await _auth_Tutorial__WEBPACK_IMPORTED_MODULE_0__["default"].getLecturerTutorials());
        $('#student-tutorials').html(await _auth_Tutorial__WEBPACK_IMPORTED_MODULE_0__["default"].searchLecturerTutorials(searchValue));
      });
      $('.table__body__row__item__delete').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        await _auth_Tutorial__WEBPACK_IMPORTED_MODULE_0__["default"].deleteTutorial(target.dataset.tutorialid);
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/secretary/grades.js":
/*!*********************************************************!*\
  !*** ./public/assets/js/src/events/secretary/grades.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Grade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Grade */ "./public/assets/js/src/auth/Grade.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  if (!targetPage || targetPage != 'secretary-grades') return;
  $('#grades').html(await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].getSecretaryGrades());
  $('.table__body__row__item__publish').on('click', async e => {
    const target = e.currentTarget.parentElement;
    await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].publishGrade(target.dataset.gradeid);
  });
  $('.table__body__row__item__delete').on('click', async e => {
    const target = e.currentTarget.parentElement;
    await _auth_Grade__WEBPACK_IMPORTED_MODULE_0__["default"].deleteGrade(target.dataset.gradeid);
  });
  $('.table__body__row__item__edit').on('click', async e => {
    const target = e.currentTarget.parentElement; // await gradeAuth.publishGrade(target.dataset.gradeid);
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/secretary/index.js":
/*!********************************************************!*\
  !*** ./public/assets/js/src/events/secretary/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _grades__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grades */ "./public/assets/js/src/events/secretary/grades.js");
/* harmony import */ var _tests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tests */ "./public/assets/js/src/events/secretary/tests.js");
/* harmony import */ var _sign_in__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sign-in */ "./public/assets/js/src/events/secretary/sign-in.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  (0,_grades__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_tests__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_sign_in__WEBPACK_IMPORTED_MODULE_2__["default"])();
});

/***/ }),

/***/ "./public/assets/js/src/events/secretary/sign-in.js":
/*!**********************************************************!*\
  !*** ./public/assets/js/src/events/secretary/sign-in.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Secretary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Secretary */ "./public/assets/js/src/auth/Secretary.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'secretary-sign-in') return;
  $(() => {
    (async () => {
      $('#secretary-sign-in-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Secretary__WEBPACK_IMPORTED_MODULE_0__["default"].signIn();
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/secretary/tests.js":
/*!********************************************************!*\
  !*** ./public/assets/js/src/events/secretary/tests.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Test */ "./public/assets/js/src/auth/Test.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  if (!targetPage || targetPage != 'secretary-tests') return;
  $('#tests').html(await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].getSecretaryTests());
  $('.table__body__row__item__delete').on('click', async e => {
    const target = e.currentTarget.parentElement;
    await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].deleteTest(target.dataset.testid);
  });
  $('.table__body__row__item__publish').on('click', async e => {
    const target = e.currentTarget.parentElement;
    await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].publishTest(target.dataset.testid);
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/sign-in.js":
/*!************************************************!*\
  !*** ./public/assets/js/src/events/sign-in.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/Admin */ "./public/assets/js/src/auth/Admin.js");
/* harmony import */ var _auth_Lecturer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/Lecturer */ "./public/assets/js/src/auth/Lecturer.js");
/* harmony import */ var _auth_Secretary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/Secretary */ "./public/assets/js/src/auth/Secretary.js");
/* harmony import */ var _auth_Student__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth/Student */ "./public/assets/js/src/auth/Student.js");
/* harmony import */ var _helpers_show_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/show-error */ "./public/assets/js/src/helpers/show-error.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'sign-in') return;
  $('#sign-in-form').on('submit', e => {
    try {
      e.preventDefault();
      const loginOptions = {
        admin: _auth_Admin__WEBPACK_IMPORTED_MODULE_0__["default"],
        lecturer: _auth_Lecturer__WEBPACK_IMPORTED_MODULE_1__["default"],
        secretary: _auth_Secretary__WEBPACK_IMPORTED_MODULE_2__["default"],
        student: _auth_Student__WEBPACK_IMPORTED_MODULE_3__["default"]
      }; // get radio button value

      const loginType = $('input[name="login-type"]:checked').val(); // admin, lecturer, secretary, student
      // if no radion button has been clicked, throw error

      if (!loginType) throw 'Please select account type';
      loginOptions[loginType].signIn();
    } catch (e) {
      (0,_helpers_show_error__WEBPACK_IMPORTED_MODULE_4__["default"])('sign-in-error', e);
    }
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/student/goals.js":
/*!******************************************************!*\
  !*** ./public/assets/js/src/events/student/goals.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Goal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Goal */ "./public/assets/js/src/auth/Goal.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'student-goals') return;
  $(() => {
    (async () => {
      $('#student-goals').html(await _auth_Goal__WEBPACK_IMPORTED_MODULE_0__["default"].getGoals());
      $('.table__body__row__item__delete').on('click', async e => {
        const target = e.currentTarget.parentElement.parentElement;
        await _auth_Goal__WEBPACK_IMPORTED_MODULE_0__["default"].deleteGoal(target.dataset.goalid);
      });
      $('#new-goal-form').on('submit', e => {
        e.preventDefault();
        _auth_Goal__WEBPACK_IMPORTED_MODULE_0__["default"].add();
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/student/index.js":
/*!******************************************************!*\
  !*** ./public/assets/js/src/events/student/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sign_in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sign-in */ "./public/assets/js/src/events/student/sign-in.js");
/* harmony import */ var _sign_up__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign-up */ "./public/assets/js/src/events/student/sign-up.js");
/* harmony import */ var _tests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tests */ "./public/assets/js/src/events/student/tests.js");
/* harmony import */ var _goals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./goals */ "./public/assets/js/src/events/student/goals.js");
/* harmony import */ var _progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./progress */ "./public/assets/js/src/events/student/progress.js");
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile */ "./public/assets/js/src/events/student/profile.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  (0,_sign_in__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_sign_up__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_tests__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_goals__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_progress__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_profile__WEBPACK_IMPORTED_MODULE_5__["default"])();
});

/***/ }),

/***/ "./public/assets/js/src/events/student/profile.js":
/*!********************************************************!*\
  !*** ./public/assets/js/src/events/student/profile.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Tutorial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Tutorial */ "./public/assets/js/src/auth/Tutorial.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'student-profile') return;
  $(() => {
    (async () => {
      $('#tutorials').html(await _auth_Tutorial__WEBPACK_IMPORTED_MODULE_0__["default"].getStudentTutorials());
      $('#change-photo').on('change', e => {
        const formData = new FormData();
        formData.append('profile', $('#change-photo')[0]['files'][0]);
        $.ajax({
          url: '/student/change-profile',
          data: formData,
          enctype: 'multipart/form-data',
          method: 'POST',
          processData: false,
          contentType: false,
          success: response => {
            if (response.successful) return location.href = location.href;
          }
        });
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/student/progress.js":
/*!*********************************************************!*\
  !*** ./public/assets/js/src/events/student/progress.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Progress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Progress */ "./public/assets/js/src/auth/Progress.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'student-progress') return;
  $(() => {
    (async () => {
      $('#student-progress').html(await _auth_Progress__WEBPACK_IMPORTED_MODULE_0__["default"].getProgress());
      $('#progress-report-btn').on('click', async () => {
        await _auth_Progress__WEBPACK_IMPORTED_MODULE_0__["default"].downloadReport();
      });
      $('.table__body__row').on('click', async e => {
        const elems = $('.table__body__row__item', e.currentTarget),
              goal = parseInt(elems[4].innerText),
              grade = parseInt(elems[5].innerText);
        const popup = `
                    <div class="popup_overlay" style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;">
                        <div class="card popup_main" style="position: absolute; top: ${window.event.clientY}px; left: ${window.event.clientX}px;">
                            <div class="card__header">Status</div>
                            <div class="card__body">
                                <p>Goal reached: ${grade >= goal ? 'Yes' : 'No'}</p>
                                <p>Grade passed: ${grade >= 50 ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                `;
        $('body').append(popup);
        $('.popup_overlay').on('click', e => {
          e.currentTarget.remove();
        });
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/student/sign-in.js":
/*!********************************************************!*\
  !*** ./public/assets/js/src/events/student/sign-in.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Student__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Student */ "./public/assets/js/src/auth/Student.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'student-sign-in') return;
  $(() => {
    (async () => {
      $('#student-sign-in-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Student__WEBPACK_IMPORTED_MODULE_0__["default"].signIn();
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/student/sign-up.js":
/*!********************************************************!*\
  !*** ./public/assets/js/src/events/student/sign-up.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Student__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Student */ "./public/assets/js/src/auth/Student.js");
/* harmony import */ var _helpers_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/fetch */ "./public/assets/js/src/helpers/fetch.js");
/* harmony import */ var _helpers_add_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/add-module */ "./public/assets/js/src/helpers/add-module.js");
/* harmony import */ var _helpers_formater__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers/formater */ "./public/assets/js/src/helpers/formater.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'student-sign-up') return;
  $(() => {
    (async () => {
      $('#student-module-1').html((0,_helpers_formater__WEBPACK_IMPORTED_MODULE_3__.formatSelect)((await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_1__["default"])('/modules/fetch')).modules));
      $('#student-funder').html((0,_helpers_formater__WEBPACK_IMPORTED_MODULE_3__.formatSelect)((await (0,_helpers_fetch__WEBPACK_IMPORTED_MODULE_1__["default"])('/funders/fetch/all')).funders));
      $('#new-student-form').on('submit', async e => {
        e.preventDefault();
        await _auth_Student__WEBPACK_IMPORTED_MODULE_0__["default"].add();
      });
      $('#add-module-item-btn').on('click', () => {
        (0,_helpers_add_module__WEBPACK_IMPORTED_MODULE_2__.createModuleItem)('student');
      });
      $('#delete-item-1').on('click', () => {
        (0,_helpers_add_module__WEBPACK_IMPORTED_MODULE_2__.removeModuleItem)(1, 'student');
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/events/student/tests.js":
/*!******************************************************!*\
  !*** ./public/assets/js/src/events/student/tests.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth_Test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/Test */ "./public/assets/js/src/auth/Test.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  if (!targetPage || targetPage != 'student-tests') return;
  $(() => {
    (async () => {
      $('#student-tests').html(await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].getStudentTests());
      $('#tests-search-box').on('keyup', async e => {
        const searchValue = e.currentTarget.value;
        if (searchValue.length < 3) return $('#student-tests').html(await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].getStudentTests());
        $('#student-tests').html(await _auth_Test__WEBPACK_IMPORTED_MODULE_0__["default"].searchStudentTests(searchValue));
      });
    })();
  });
});

/***/ }),

/***/ "./public/assets/js/src/helpers/add-module.js":
/*!****************************************************!*\
  !*** ./public/assets/js/src/helpers/add-module.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createModuleItem": () => (/* binding */ createModuleItem),
/* harmony export */   "removeModuleItem": () => (/* binding */ removeModuleItem)
/* harmony export */ });
const createModuleItem = (type = 'course') => {
  const moduleCount = parseInt($('#module-count').val()) + 1;
  const itemTemplate = `
        <div class="input-wrapper" id="module-item-${moduleCount}" style="margin-top: 1.6rem;">
            <label for="${type}-module-${moduleCount}" id="${type}-module-${moduleCount}-label">Module: ${moduleCount}</label>
            <div class="flex flex--a-center">
                <select id="${type}-module-${moduleCount}" class="input-wrapper__input modules__item" style="flex: 1;"></select>
                <svg class="image--icon" style="margin-left: 1rem; fill: #b68c8c;" id="delete-item-${moduleCount}">
                    <use href="#cancel"></use>
                </svg>
            </div>
        </div>
    `;
  const parent = $(`.modules`)[0];
  $(itemTemplate).appendTo(parent);
  $(`#${type}-module-${moduleCount}`).html($(`#${type}-module-1`).html());
  $(`#delete-item-${moduleCount}`).on('click', e => {
    const itemId = e.currentTarget.id.split('-')[2];
    removeModuleItem(itemId, type);
  });
  $('#module-count').val(moduleCount);
};

const rename = (itemId, moduleCount, type) => {
  itemId = parseInt(itemId);

  for (let i = moduleCount; i > itemId; i--) {
    const oldId = i,
          currentId = oldId - 1;
    const item = $(`#module-item-${oldId}`)[0];
    item.id = `module-item-${currentId}`;
    const label = $(`#${type}-module-${oldId}-label`)[0];
    $(label).attr('for', `#${type}-module-${currentId}`);
    label.id = `${type}-module-${currentId}-label`;
    label.innerText = `Module: ${currentId}`;
    const select = $(`#${type}-module-${oldId}`)[0];
    select.id = `${type}-module-${currentId}`;
    const deleteBtn = $(`#delete-item-${oldId}`);
    deleteBtn[0].id = `delete-item-${currentId}`; // remove previous event, because it points to an old id

    deleteBtn.off('click'); // set new event pointing to current event

    $(deleteBtn).on('click', () => {
      removeModuleItem(currentId, type);
    });
  }

  $('#module-count').val(moduleCount - 1);
};

const removeModuleItem = (itemId, type = 'course') => {
  const moduleCount = parseInt($('#module-count').val());
  if (moduleCount == 1) return;
  $(`#module-item-${itemId}`).remove();
  rename(itemId, moduleCount, type);
};

/***/ }),

/***/ "./public/assets/js/src/helpers/date.js":
/*!**********************************************!*\
  !*** ./public/assets/js/src/helpers/date.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticDate": () => (/* binding */ getStaticDate)
/* harmony export */ });
const getMonths = () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const makeTime = date => {
  let hours = date.getHours(),
      minutes = date.getMinutes();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let time = hours + ':' + minutes,
      day = date.getDate(),
      month = getMonths()[date.getMonth()],
      year = date.getFullYear().toString();
  return {
    time,
    day,
    month,
    year
  };
};

const getStaticDate = date => {
  const {
    time,
    day,
    month,
    year
  } = makeTime(date);
  return `${time}, ${day} ${month} ${year[2] + year[3]}'`;
};

/***/ }),

/***/ "./public/assets/js/src/helpers/fetch.js":
/*!***********************************************!*\
  !*** ./public/assets/js/src/helpers/fetch.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (uri, {
  method = 'POST',
  headers = {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body
} = {}) => {
  const response = await fetch(uri, {
    method,
    headers,
    body: JSON.stringify(body)
  });
  return await response.json();
});

/***/ }),

/***/ "./public/assets/js/src/helpers/formater.js":
/*!**************************************************!*\
  !*** ./public/assets/js/src/helpers/formater.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatAdminGoals": () => (/* binding */ formatAdminGoals),
/* harmony export */   "formatCourses": () => (/* binding */ formatCourses),
/* harmony export */   "formatFunders": () => (/* binding */ formatFunders),
/* harmony export */   "formatGoals": () => (/* binding */ formatGoals),
/* harmony export */   "formatLecturerTutorials": () => (/* binding */ formatLecturerTutorials),
/* harmony export */   "formatLecturers": () => (/* binding */ formatLecturers),
/* harmony export */   "formatModules": () => (/* binding */ formatModules),
/* harmony export */   "formatProgress": () => (/* binding */ formatProgress),
/* harmony export */   "formatSecretaries": () => (/* binding */ formatSecretaries),
/* harmony export */   "formatSelect": () => (/* binding */ formatSelect),
/* harmony export */   "formatStudentTutorials": () => (/* binding */ formatStudentTutorials),
/* harmony export */   "formatStudents": () => (/* binding */ formatStudents),
/* harmony export */   "formatStudentsAdmin": () => (/* binding */ formatStudentsAdmin),
/* harmony export */   "formatStudentsGradesAdmin": () => (/* binding */ formatStudentsGradesAdmin),
/* harmony export */   "formatStudentsGradesLecturer": () => (/* binding */ formatStudentsGradesLecturer),
/* harmony export */   "formatStudentsGradesSecretary": () => (/* binding */ formatStudentsGradesSecretary),
/* harmony export */   "formatTestsAdmin": () => (/* binding */ formatTestsAdmin),
/* harmony export */   "formatTestsLecturer": () => (/* binding */ formatTestsLecturer),
/* harmony export */   "formatTestsSecretary": () => (/* binding */ formatTestsSecretary),
/* harmony export */   "formatTestsStudent": () => (/* binding */ formatTestsStudent)
/* harmony export */ });
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date */ "./public/assets/js/src/helpers/date.js");

const formatModules = (modules, tools = true) => {
  let formated = '',
      count = 1;
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
    `;
  modules.forEach(_module => {
    formated += `
            <ul class="table__body__row module-item" data-moduleid="${_module._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${_module.name}</li>
                <li class="table__body__row__item">${_module.code}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(_module.createdAt))}</li>
                ${edts}
            </ul>
        `;
    count++;
  });
  return formated;
}; // in use

const formatTestsStudent = ({
  tests,
  grades
}) => {
  let formated = '',
      count = 1,
      average = 0;
  const sortedTests = {};
  tests.forEach(test => {
    console.log(sortedTests[test.moduleID.name], test.moduleID.name);
    sortedTests[test.moduleID.name] = sortedTests[test.moduleID.name] ? sortedTests[test.moduleID.name] : [];
    sortedTests[test.moduleID.name].push(test);
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
                    <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(test.createdAt))}</li>
                </ul>
            `;
      count++;
      index = 'end';
    });
  }

  average = average == 'NaN' ? 0 : average;
  $('#average-grade').text(parseInt(average / (count - 1 || 1)));
  return formated;
}; // in use

const formatTestsLecturer = tests => {
  let formated = '',
      count = 1;
  tests.forEach(test => {
    let status = '<li class="table__body__row__item last-cell">No action required</li>';
    if (test.publishRequest) status = '<li class="table__body__row__item table__body__row__item__publish last-cell">Publish requested</li>';else if (test.deleteRequest) status = '<li class="table__body__row__item table__body__row__item__delete last-cell">Delete requested</li>';
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
}; // in use

const formatTestsSecretary = tests => {
  let formated = '',
      count = 1;
  tests.forEach(test => {
    let action = '<li class="table__body__row__item last-cell">No action required</li>';
    if (test.publishRequest) action = '<li class="table__body__row__item table__body__row__item__publish last-cell">Process publish</li>';else if (test.deleteRequest) action = '<li class="table__body__row__item table__body__row__item__delete last-cell">Process delete</li>';
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
}; // in use

const formatTestsAdmin = tests => {
  let formated = '',
      count = 1;
  tests.forEach(test => {
    let action = '<li class="table__body__row__item last-cell">No action required</li>';
    if (test.publishRequest) action = '<li class="table__body__row__item table__body__row__item__publish last-cell">Process publish</li>';else if (test.deleteRequest) action = '<li class="table__body__row__item table__body__row__item__delete last-cell">Process delete</li>';
    formated += `
            <ul class="table__body__row test-record" data-testId=${test._id}>
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${test.lecturerID.firstname + ' ' + test.lecturerID.lastname}</li>
                <li class="table__body__row__item">${test.name}</li>
                <li class="table__body__row__item">${test.moduleID.name}</li>
                <li class="table__body__row__item">${test.weight}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(test.createdAt))}</li>
            </ul>
        `;
    count++;
  });
  return formated;
};
const formatGoals = goals => {
  let formated = '',
      count = 1,
      result;
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
};
const formatAdminGoals = goals => {
  let formated = '',
      count = 1;
  goals.forEach(goal => {
    formated += `
            <ul class="table__body__row goal-record student-record" data-studentId="${goal.studentID._id}" data-goalid="${goal._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${goal.moduleID.name}</li>
                <li class="table__body__row__item">${goal.studentID.firstname + ' ' + goal.studentID.lastname}</li>
                <li class="table__body__row__item">${goal.goal}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(goal.createdAt))}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn btn--primary table__body__row__item__report">Get report</button>
                    <button class="btn table__body__row__item__delete">Delete</button>
                </li>
            </ul>
        `;
    count++;
  });
  return formated;
};
const formatStudents = students => {
  let formated = '',
      count = 1;
  students.forEach(student => {
    formated += `
            <ul class="table__body__row student-record" data-studentId="${student._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${student.firstname}</li>
                <li class="table__body__row__item">${student.lastname}</li>
                <li class="table__body__row__item">${student.studentNumber}</li>
                <li class="table__body__row__item">${student.email}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(student.createdAt))}</li>
            </ul>
        `;
    count++;
  });
  return formated;
}; // in use

const formatStudentsAdmin = students => {
  let formated = '',
      count = 1;
  students.forEach(student => {
    formated += `
            <ul class="table__body__row student-record" data-studentId="${student._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${student.firstname}</li>
                <li class="table__body__row__item">${student.lastname}</li>
                <li class="table__body__row__item">${student.studentNumber}</li>
                <li class="table__body__row__item">${student.email}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(student.createdAt))}</li>
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
};
const formatCourses = courses => {
  let formated = '',
      count = 1;
  courses.forEach(course => {
    formated += `
            <ul class="table__body__row">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${course.name}</li>
                <li class="table__body__row__item">${course.code}</li>
                <li class="table__body__row__item">${course.modules.length}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(course.createdAt))}</li>
            </ul>
        `;
    count++;
  });
  return formated;
};
const formatLecturers = lecturers => {
  let formated = '',
      count = 1;
  lecturers.forEach(lecturer => {
    formated += `
            <ul class="table__body__row" data-lecturerid="${lecturer._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${lecturer.firstname}</li>
                <li class="table__body__row__item">${lecturer.lastname}</li>
                <li class="table__body__row__item">${lecturer.email}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(lecturer.createdAt))}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn table__body__row__item__edit">Edit</button>
                    <button class="btn table__body__row__item__delete">Delete</button>
                </li>
            </ul>
        `;
    count++;
  });
  return formated;
};
const formatSecretaries = secretaries => {
  let formated = '',
      count = 1;
  secretaries.forEach(secretary => {
    formated += `
            <ul class="table__body__row">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${secretary.firstname}</li>
                <li class="table__body__row__item">${secretary.lastname}</li>
                <li class="table__body__row__item">${secretary.email}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(secretary.createdAt))}</li>
            </ul>
        `;
    count++;
  });
  return formated;
}; // in use 

const formatStudentsGradesLecturer = grades => {
  let formated = '',
      count = 1;
  grades.forEach(grade => {
    let status = 'Published';
    if (grade.publishRequest) status = 'Publish requested';else if (grade.deleteRequest) status = 'Delete requested';
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
}; // in use 

const formatStudentsGradesSecretary = grades => {
  let formated = '',
      count = 1;
  grades.forEach(grade => {
    let action = '<li class="table__body__row__item last-cell">No action required</li>';
    if (grade.publishRequest) action = '<li class="table__body__row__item table__body__row__item__publish last-cell">Process publish</li>';else if (grade.deleteRequest) action = '<li class="table__body__row__item table__body__row__item__delete last-cell">Process delete</li>';else if (grade.editRequest) action = '<li class="table__body__row__item table__body__row__item__edit last-cell">Process edit</li>';
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
};
const formatStudentsGradesAdmin = (grades, codes) => {
  let formated = '',
      count = 1;
  grades.forEach(grade => {
    formated += `
            <ul class="table__body__row" data-gradeid="${grade._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${codes[count - 1].code}</li>
                <li class="table__body__row__item">${grade.testID.name}</li>
                <li class="table__body__row__item">${grade.studentID.firstname + ' ' + grade.studentID.lastname}</li>
                <li class="table__body__row__item last-cell">${grade.actualGrade}</li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn table__body__row__item__delete">Delete</button>
                </li>
            </ul>
        `;
    count++;
  });
  return formated;
}; // in use 

const formatFunders = funders => {
  let formated = '',
      count = 1;
  funders.forEach(funder => {
    formated += `
            <ul class="table__body__row" data-funderid="${funder._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${funder.name}</li>
                <li class="table__body__row__item">${funder.email}</li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(funder.createdAt))}<li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn table__body__row__item__edit">edit</button>
                    <button class="btn table__body__row__item__delete">delete</button>
                </li>
            </ul>
        `;
    count++;
  });
  return formated;
}; // in use 

const formatLecturerTutorials = tutorials => {
  let formated = '',
      count = 1;
  tutorials.forEach(tutorial => {
    formated += `
            <ul class="table__body__row" data-tutorialid="${tutorial._id}">
                <li class="table__body__row__item short">${count}</li>
                <li class="table__body__row__item">${tutorial.moduleID.name}</li>
                <li class="table__body__row__item">${tutorial.description}</li>
                <li class="table__body__row__item"><a href="${tutorial.link}">${tutorial.link}</a></li>
                <li class="table__body__row__item last-cell">${(0,_date__WEBPACK_IMPORTED_MODULE_0__.getStaticDate)(new Date(tutorial.createdAt))}<li>
                <li class="table__body__row__item table__body__row__item--tools pos--abs pos--vertical">
                    <button class="btn table__body__row__item__delete">delete</button>
                </li>
            </ul>
        `;
    count++;
  });
  return formated;
}; // in use 

const formatStudentTutorials = tutorials => {
  let formated = '',
      count = 1;
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
};
const formatProgress = modules => {
  let formated = '',
      count = 1;

  for (let moduleName in modules) {
    if (!modules.hasOwnProperty(moduleName)) continue;
    let gradeNeeded = modules[moduleName].finalGrade < 50 ? 50 - modules[moduleName].finalGrade : 0;
    let toGoal = modules[moduleName].goal - modules[moduleName].finalGrade;
    toGoal = toGoal > 0 ? toGoal : 0;
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
};
const formatSelect = modules => {
  let formated = '<option value="select">Select</option>';
  let temp = [],
      dic = {};
  modules.forEach(_module => {
    dic[_module.name] = _module._id;
    temp.push(_module.name);
  });
  temp.sort().forEach(_module => {
    formated += `<option value="${dic[_module]}">${_module}</option>`;
  });
  return formated;
};

/***/ }),

/***/ "./public/assets/js/src/helpers/index.js":
/*!***********************************************!*\
  !*** ./public/assets/js/src/helpers/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./public/assets/js/src/helpers/modal.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  (0,_modal__WEBPACK_IMPORTED_MODULE_0__["default"])();
});

/***/ }),

/***/ "./public/assets/js/src/helpers/modal.js":
/*!***********************************************!*\
  !*** ./public/assets/js/src/helpers/modal.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
const closeModal = id => {
  const modal = $(`#${id}-modal`);
  modal.addClass('modal--closed');
  setTimeout(() => modal.remove(), 300);
};
const openModal = id => {
  const modal = $(`#${id}-modal`);
  modal.removeClass('modal--closed');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  $('.open-modal').on('click', e => {
    $(`#${e.currentTarget.dataset.modal}-modal`).removeClass('modal--closed');
  });
  $('.close-modal').on('click', e => {
    const modal = $(`#${e.currentTarget.dataset.modal}-modal`);
    modal.addClass('modal--closed');
  });
});

/***/ }),

/***/ "./public/assets/js/src/helpers/show-error.js":
/*!****************************************************!*\
  !*** ./public/assets/js/src/helpers/show-error.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((parentId, error) => {
  const parent = $(`#${parentId}`);
  parent.show();
  $('.error-container__p__text', parent[0]).html(error);
});

/***/ }),

/***/ "./public/assets/js/src/helpers/validation.js":
/*!****************************************************!*\
  !*** ./public/assets/js/src/helpers/validation.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasNumbers": () => (/* binding */ hasNumbers),
/* harmony export */   "hasSpecialChars": () => (/* binding */ hasSpecialChars),
/* harmony export */   "isAlpha": () => (/* binding */ isAlpha),
/* harmony export */   "isEmail": () => (/* binding */ isEmail),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isSpecialChar": () => (/* binding */ isSpecialChar),
/* harmony export */   "isWhitespace": () => (/* binding */ isWhitespace)
/* harmony export */ });
const isAlpha = str => /^[A-Za-z]+$/.test(str);
const isNumber = str => /^\d+$/.test(str);
const hasNumbers = str => /\d/g.test(str);
const isWhitespace = str => /\s/g.test(str);
const isEmail = str => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
const isSpecialChar = str => /[^a-zA-Z0-9 ]/.test(str);
const hasSpecialChars = str => /[a-zA-Z0-9 ]/g.test(str);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./public/assets/js/src/app.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./public/assets/js/src/events/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./public/assets/js/src/helpers/index.js");


(0,_events__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_helpers__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;