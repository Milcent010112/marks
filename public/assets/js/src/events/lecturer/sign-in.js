import lecturerAuth from "../../auth/Lecturer";

export default () => {
    if (!targetPage || targetPage != 'lecturer-sign-in')
        return;

    $(() => {
        (async () => {
            $('#lecturer-sign-in-form').on('submit', async (e) => {
                e.preventDefault();

                await lecturerAuth.signIn();
            });
        })();
    });
}