import goalAuth from "../../auth/Goal";

export default () => {
    if (!targetPage || targetPage != 'student-goals')
        return;

    $(() => {
        (async () => {
            $('#student-goals').html(await goalAuth.getGoals());

            $('.table__body__row__item__delete').on('click', async e => {
                const target = e.currentTarget.parentElement.parentElement;

                await goalAuth.deleteGoal(target.dataset.goalid);
            });

            $('#new-goal-form').on('submit', (e) => {
                e.preventDefault();

                goalAuth.add();
            });
        })();
    });
}