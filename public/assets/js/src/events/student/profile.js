import tutorialAuth from "../../auth/Tutorial";

export default () => {
    if (!targetPage || targetPage != 'student-profile')
        return;

    $(() => {
        (async () => {
            $('#tutorials').html(await tutorialAuth.getStudentTutorials());

            $('#change-photo').on('change', e => {
                const formData = new FormData();

                formData.append('profile', $('#change-photo')[0]['files'][0]);

                $.ajax({
                    url: '/student/change-profile',
                    data: formData,
                    enctype: 'multipart/form-data',
                    method: 'POST',
                    processData: false,
                    contentType: false,
                    success: (response) => {
                        if (response.successful)
                            return location.href = location.href
                    }
                });
            })
        })();
    });
}