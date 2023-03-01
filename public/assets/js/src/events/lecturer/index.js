import signIn from "./sign-in";
import signUp from "./sign-up";
import modules from "./modules";
import students from "./students";
import testsAndExams from "./tests-exams";
import grades from "./grades";
import tutorials from "./tutorials";

export default () => {
    signIn();
    signUp();
    modules();
    students();
    testsAndExams();
    grades();
    tutorials();
};