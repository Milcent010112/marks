import moduleAuth from "../../auth/Module";
import { openModal } from "../../helpers/modal";

export default () => {
    if (!targetPage || targetPage != 'admin-modules')
        return;

    $(() => {
        (async () => {
            $('#new-module-form').on('submit', async (e) => {
                e.preventDefault();

                await moduleAuth.add();
            });

            $('#registered-modules').html(await moduleAuth.getModules())

            $('#modules-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#registered-modules').html(await moduleAuth.getModules())


                $('#registered-modules').html(await moduleAuth.searchAdminModules(searchValue))
            })

            $('.table__body__row__item__get-student-goal-report').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                await moduleAuth.getStudentGoalReport(target.dataset.moduleid);
            });

            $('.table__body__row__item__delete').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                await moduleAuth.deleteModule(target.dataset.moduleid);
            });

            $('.table__body__row__item__edit').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                const moduleDetails = await moduleAuth.getModuleDetails(target.dataset.moduleid);

                $('#edit-module-id').val(moduleDetails._id)
                $('#edit-module-code').val(moduleDetails.code)
                $('#edit-module-name').val(moduleDetails.name)

                openModal('edit-module');
            });

            $('#edit-module-form').on('submit', async e => {
                await moduleAuth.editModule($('#edit-module-id').val());
            });
        })();
    });
}