import gradeAuth from "../../auth/Grade";

export default () => {
    if (!targetPage || targetPage != 'admin-grades')
        return;

    $(() => {
        (async () => {
            $('#student-grades').html(await gradeAuth.getAll())

            $('#grades-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#student-grades').html(await gradeAuth.getAll())

                $('#student-grades').html(await gradeAuth.searchAdminGrades(searchValue))
            })
        })();
    });
}