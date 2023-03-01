import secretaryAuth from "../../auth/Secretary";

export default () => {
    if (!targetPage || targetPage != 'admin-secretaries')
        return;

    $(() => {
        (async () => {
            $('#new-secretary-form').on('submit', async (e) => {
                e.preventDefault();

                await secretaryAuth.add();
            });

            $('#registered-secretaries').html(await secretaryAuth.getSecretaries())

            $('#secretaries-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#registered-secretaries').html(await secretaryAuth.getSecretaries())


                $('#registered-secretaries').html(await secretaryAuth.searchAdminSecretaries(searchValue))
            })
        })();
    });
}