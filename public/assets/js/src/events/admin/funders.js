import funderAuth from "../../auth/Funder";
import { openModal } from "../../helpers/modal";

export default () => {
    if (!targetPage || targetPage != 'admin-funders')
        return;

    $(() => {
        (async () => {
            $('#new-funder-form').on('submit', async (e) => {
                e.preventDefault();

                await funderAuth.addFunder();
            });

            $('#registered-funders').html(await funderAuth.getAll())

            $('#funders-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#registered-funders').html(await funderAuth.getAll())


                $('#registered-funders').html(await funderAuth.search(searchValue))
            })

            $('.table__body__row__item__delete').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                await funderAuth.deleteFunder(target.dataset.funderid);
            });

            $('.table__body__row__item__edit').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                const funderDetails = await funderAuth.getFunderDetails(target.dataset.funderid);

                $('#funder-id').val(funderDetails._id)
                $('#edit-funder-name').val(funderDetails.name)
                $('#edit-funder-email').val(funderDetails.email)

                openModal('edit-funder');
            });

            $('#edit-funder-form').on('submit', async e => {
                await funderAuth.updateFunder($('#funder-id').val());
            });
        })();
    });
}