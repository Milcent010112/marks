import progressAuth from "../../auth/Progress";

export default () => {
    if (!targetPage || targetPage != 'student-progress')
        return;

    $(() => {
        (async () => {
            $('#student-progress').html(await progressAuth.getProgress());

            $('#progress-report-btn').on('click', async () => {
                await progressAuth.downloadReport()
            })

            $('.table__body__row').on('click', async e => {
                const elems = $('.table__body__row__item', e.currentTarget),
                    goal = parseInt(elems[4].innerText),
                    grade = parseInt(elems[5].innerText);

                const popup = `
                    <div class="popup_overlay" style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;">
                        <div class="card popup_main" style="position: absolute; top: ${window.event.clientY}px; left: ${window.event.clientX}px;">
                            <div class="card__header">Status</div>
                            <div class="card__body">
                                <p>Goal reached: ${grade >= goal ? 'Yes' : 'No'}</p>
                                <p>Grade passed: ${grade >= 50 ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                `

                $('body').append(popup)

                $('.popup_overlay').on('click', e => {
                    e.currentTarget.remove()
                })
            })
        })();
    });
}