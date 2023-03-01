import studentAuth from "../../auth/Student";

export default () => {
    if (!targetPage || targetPage != 'student-sign-in')
        return;

    $(() => {
        (async () => {
            $('#student-sign-in-form').on('submit', async (e) => {
                e.preventDefault();

                await studentAuth.signIn();
            });
        })();
    });
}