import studentAuth from "../../auth/Student";
import fetch from "../../helpers/fetch";

import { createModuleItem, removeModuleItem } from "../../helpers/add-module";
import { formatSelect } from "../../helpers/formater";

export default () => {
    if (!targetPage || targetPage != 'student-sign-up')
        return;

    $(() => {
        (async () => {
            $('#student-module-1').html(formatSelect((await fetch('/modules/fetch')).modules));
            $('#student-funder').html(formatSelect((await fetch('/funders/fetch/all')).funders));

            $('#new-student-form').on('submit', async (e) => {
                e.preventDefault();

                await studentAuth.add();
            });

            $('#add-module-item-btn').on('click', () => {
                createModuleItem('student');
            });

            $('#delete-item-1').on('click', () => {
                removeModuleItem(1, 'student');
            })
        })();
    });
}