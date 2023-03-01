import courseAuth from "../../auth/Course";
import { createModuleItem, removeModuleItem } from "../../helpers/add-module";

export default () => {
    if (!targetPage || targetPage != 'admin-courses')
        return;

    $(() => {
        (async () => {
            $('#new-course-form').on('submit', async (e) => {
                e.preventDefault();

                await courseAuth.add();
            });

            $('#registered-courses').html(await courseAuth.getCourses());

            $('#add-module-item-btn').on('click', () => {
                createModuleItem();
            });

            $('#delete-item-1').on('click', () => {
                removeModuleItem(1);
            })
        })();
    });
}