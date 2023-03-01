import testAuth from "../../auth/Test";

export default () => {
    if (!targetPage || targetPage != 'admin-tests')
        return;

    $(() => {
        (async () => {
            $('#tests').html(await testAuth.getAdminTests())

            $('#tests-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#tests').html(await testAuth.getAdminTests())

                $('#tests').html(await testAuth.searchAdminTests(searchValue))
            })
        })();
    });
}