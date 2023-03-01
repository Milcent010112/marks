import studentAuth from "../../auth/Student";
import gradeAuth from "../../auth/Grade";
import moduleAuth from "../../auth/Module";
import { openModal } from "../../helpers/modal";

export default () => {
    if (!targetPage || targetPage != 'lecturer-students')
        return;

    $(() => {
        (async () => {
            $('#assigned-students').html(await studentAuth.getModuleStudents());

            $('.student-record').on('click', async (e) => {
                const studentId = e.currentTarget.dataset.studentid;
                const pagePath = location.pathname.split('/');

                const moduleDetails = await moduleAuth.getModuleDetails(pagePath[pagePath.length - 2]);

                $('#student-number').val($('.table__body__row__item', e.currentTarget)[3].innerText);

                $('#test-module').val(moduleDetails.name);

                $('#test-module-id').val(moduleDetails._id);

                openModal('new-student-grade');
            });

            $('#new-student-grade-form').on('submit', async (e) => {
                e.preventDefault();

                await gradeAuth.add();
            });
        })();
    });
}