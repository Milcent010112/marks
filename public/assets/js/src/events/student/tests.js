import testAuth from "../../auth/Test";

export default () => {
    if (!targetPage || targetPage != 'student-tests')
        return;

    $(() => {
        (async () => {
            $('#student-tests').html(await testAuth.getStudentTests());

            $('#tests-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#student-tests').html(await testAuth.getStudentTests())

                $('#student-tests').html(await testAuth.searchStudentTests(searchValue))
            })
        })();
    });
}