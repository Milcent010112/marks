import lecturerAuth from "../../auth/Lecturer";

export default () => {
    if (!targetPage || targetPage != 'admin-lecturers')
        return;

    $(() => {
        (async () => {
            $('#registered-lecturers').html(await lecturerAuth.getLecturers())

            $('#lecturers-search-box').on('keyup', async e => {
                const searchValue = e.currentTarget.value;

                if (searchValue.length < 3)
                    return $('#registered-lecturers').html(await lecturerAuth.getLecturers())

                $('#registered-lecturers').html(await lecturerAuth.searchAdminLecturers(searchValue))
            })

            $('.table__body__row__item__delete').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                await lecturerAuth.deleteLecturer(target.dataset.lecturerid);
            });

            // $('.table__body__row__item__edit').on('click', async e => {
            //     const target = e.currentTarget.parentElement.parentElement;

            //     const lecturerDetails = await lecturerAuth.getLecturerDetails(target.dataset.lecturerid);

            //     $('#edit-lecturer-id').val(lecturerDetails._id)
            //     $('#edit-lecturer-first-name').val(lecturerDetails.firstname)
            //     $('#edit-lecturer-last-name').val(lecturerDetails.lastname)
            //     $('#edit-lecturer-email').val(lecturerDetails.email)

            //     openModal('edit-lecturer');
            // });

            // $('#edit-lecturer-form').on('submit', async e => {
            //     await lecturerAuth.editLecturer($('#edit-lecturer-id').val());
            // });
        })();
    });
}