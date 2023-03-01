import gradeAuth from "../../auth/Grade";
import { openModal } from "../../helpers/modal";

export default () => {
    if (!targetPage || targetPage != 'lecturer-grades')
        return;

    $(() => {
        (async () => {
            // $('#new-grade-form').on('submit', async (e) => {
            //     e.preventDefault();

            //     await gradeAuth.add();
            // });

            $('#students-grades').html(await gradeAuth.getGrades())

            $('#grades-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#students-grades').html(await gradeAuth.getGrades())

                $('#students-grades').html(await gradeAuth.searchLecturerGrades(searchValue))
            })

            $('.table__body__row__item__delete').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                await gradeAuth.deleteGrade(target.dataset.gradeid);
            });

            $('.table__body__row__item__edit').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                const table = $('.table__body__row__item', e.currentTarget.parentElement.parentElement);

                $('#edt-student-number').val(table[1].innerText)
                $('#edt-test-name').val(table[3].innerText)

                openModal('edit-grade');

                $('#edit-grade-form').on('submit', async e => {
                    e.preventDefault();

                    await gradeAuth.editGrade(target.dataset.gradeid);
                })
            });
        })();
    });
}