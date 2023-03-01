import secretaryAuth from "../../auth/Secretary";

export default () => {
    if (!targetPage || targetPage != 'secretary-sign-in')
        return;

    $(() => {
        (async () => {
            $('#secretary-sign-in-form').on('submit', async (e) => {
                e.preventDefault();

                await secretaryAuth.signIn();
            });
        })();
    });
}