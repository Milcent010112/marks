import studentAuth from "../../auth/Student";
import { openModal } from "../../helpers/modal";
import { createModuleItem, removeModuleItem } from "../../helpers/add-module";

export default () => {
    if (!targetPage || targetPage != 'admin-students')
        return;

    $(() => {
        (async () => {
            // $('#new-student-form').on('submit', async (e) => {
            //     e.preventDefault();

            //     await studentAuth.add();
            // });

            $('#registered-students').html(await studentAuth.getStudents())

            $('#students-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#registered-students').html(await studentAuth.getStudents())


                $('#registered-students').html(await studentAuth.searchAdminStudents(searchValue))
            })

            // $('#add-module-item-btn').on('click', () => {
            //     createModuleItem('student');
            // });

            // $('#delete-item-1').on('click', () => {
            //     removeModuleItem(1, 'student');
            // })

            $('.table__body__row__item__report').on('click', async e => {
                await studentAuth.downloadReport(e.currentTarget.parentElement.parentElement.dataset.studentid);
            });

            $('.table__body__row__item__edit').on('click', e => {
                const studentDetails = $('.table__body__row__item', e.currentTarget.parentElement.parentElement);

                $('#student-update-id').val(e.currentTarget.parentElement.parentElement.dataset.studentid);
                $('#edit-student-first-name').val(studentDetails[1].innerText);
                $('#edit-student-last-name').val(studentDetails[2].innerText);
                $('#edit-student-number').val(studentDetails[3].innerText);
                $('#edit-student-email').val(studentDetails[4].innerText);

                openModal('edit-student');
            });

            $('.table__body__row__item__delete').on('click', async e => {
                await studentAuth.deleteStudent(e.currentTarget.parentElement.parentElement.dataset.studentid);
            });

            $('#edit-student-form').on('submit', async (e) => {
                e.preventDefault();

                await studentAuth.updateStudent();
            });
        })();
    });
}