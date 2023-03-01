import signIn from './sign-in';
import signUp from './sign-up';
import tests from './tests';
import goals from './goals';
import progress from './progress';
import profile from './profile';

export default () => {
    signIn();
    signUp();
    tests();
    goals();
    progress();
    profile();
};