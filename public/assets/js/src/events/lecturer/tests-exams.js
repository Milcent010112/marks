import testAuth from "../../auth/Test";

export default () => {
    if (!targetPage || targetPage != 'lecturer-tests-and-exams')
        return;

    $(() => {
        (async () => {
            $('#tests-and-exams').html(await testAuth.getLecturerTests());

            $('#tests-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#tests-and-exams').html(await testAuth.getLecturerTests())

                $('#tests-and-exams').html(await testAuth.searchLecturerTests(searchValue))
            })

            $('#new-test-form').on('submit', async (e) => {
                e.preventDefault();

                testAuth.addTest();
            });

            $('.table__body__row__item__delete').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                await testAuth.deleteTest(target.dataset.testid);
            });
        })();
    });
}