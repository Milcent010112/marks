import tutorialAuth from "../../auth/Tutorial";

export default () => {
    if (!targetPage || targetPage != 'lecturer-tutorials')
        return;

    $(() => {
        (async () => {
            $('#student-tutorials').html(await tutorialAuth.getLecturerTutorials());

            $('#new-tutorial-form').on('submit', async (e) => {
                e.preventDefault();

                tutorialAuth.addTutorial();
            });

            $('#tutorials-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#student-tutorials').html(await tutorialAuth.getLecturerTutorials())


                $('#student-tutorials').html(await tutorialAuth.searchLecturerTutorials(searchValue))
            })

            $('.table__body__row__item__delete').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                await tutorialAuth.deleteTutorial(target.dataset.tutorialid);
            });
        })();
    });
}