import goalAuth from "../../auth/Goal";
import studentAuth from "../../auth/Student"

export default () => {
    if (!targetPage || targetPage != 'admin-goals')
        return;

    $(() => {
        (async () => {
            $('#student-goals').html(await goalAuth.getAll())

            $('#goals-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#student-goals').html(await goalAuth.getAll())

                $('#student-goals').html(await goalAuth.searchAdminGoals(searchValue))
            })

            $('.table__body__row__item__report').on('click', async e => {
                await studentAuth.downloadReport(e.currentTarget.parentElement.parentElement.dataset.studentid);
            });
        })();
    });
}