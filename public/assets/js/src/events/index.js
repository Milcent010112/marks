import admin from "./admin";
import secretary from "./secretary";
import lecturer from "./lecturer";
import student from "./student";
import signIn from "./sign-in"; 

export default () => {
    admin();
    secretary();
    lecturer();
    student();
    signIn();
};