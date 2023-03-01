import adminAuth from "../../auth/Admin";

export default () => {
    if (!targetPage || targetPage != 'admin-sign-in')
        return;

    $(() => {
        (async () => {
            console.log('Hey');
            
            $('#admin-sign-in-form').on('submit', async (e) => {
                e.preventDefault();

                await adminAuth.signIn();
            });
        })();
    });
}