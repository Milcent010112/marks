import lecturerAuth from "../../auth/Lecturer";
import fetch from "../../helpers/fetch";

import { createModuleItem, removeModuleItem } from "../../helpers/add-module";
import { formatSelect } from "../../helpers/formater";

export default () => {
    if (!targetPage || targetPage != 'lecturer-sign-up')
        return;

    $(() => {
        (async () => {
            $('#lecturer-module-1').html(formatSelect((await fetch('/modules/fetch')).modules));

            $('#sign-in-form').on('submit', async (e) => {
                e.preventDefault();

                await lecturerAuth.add();
            });

            $('#add-module-item-btn').on('click', () => {
                createModuleItem('lecturer');
            });

            $('#delete-item-1').on('click', () => {
                removeModuleItem(1, 'lecturer');
            })
        })();
    });
}