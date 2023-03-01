import lecturerAuth from "../../auth/Lecturer";
import moduleAuth from "../../auth/Module";

export default () => {
    if (!targetPage || targetPage != 'lecturer-modules')
        return;

    $(() => {
        (async () => {
            $('#assigned-modules').html(await lecturerAuth.getModules());

            $('.module-item').on('click', (e) => {
                const moduleItem = e.currentTarget;

                location.href = `/l/module/${moduleItem.dataset.moduleid}/students`;
            });

            $('.table__body__row__item__get-student-goal-report').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                await moduleAuth.getStudentGoalReport(target.dataset.moduleid);
            });
        })();
    });
}