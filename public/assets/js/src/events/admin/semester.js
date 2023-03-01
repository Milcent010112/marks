import studentAuth from "../../auth/Student";

export default () => {
    if (!targetPage || targetPage != 'admin-semester')
        return;

    $(() => {
        (async () => {
            $('#end-semester-btn').on('click', async e => {
                await studentAuth.endSemester();

                e.currentTarget.disabled = true;

                setTimeout(() => e.currentTarget.disabled = false, 1000)
            });
        })();
    });
}