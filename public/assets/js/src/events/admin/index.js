import signIn from "./sign-in";
import semester from "./semester";
import modules from "./modules";
import funders from "./funders";
import students from "./students";
import lecturers from "./lecturers";
import secretaries from "./secretaries";
import goals from "./goals";
import grades from "./grades";
import tests from "./tests";

export default () => {
    signIn();
    semester();
    modules();
    funders();
    students();
    lecturers();
    secretaries();
    goals();
    grades();
    tests();
};