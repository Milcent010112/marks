import gradeAuth from "../../auth/Grade";

export default async () => {
    if (!targetPage || targetPage != 'secretary-grades')
        return;

    $('#grades').html(await gradeAuth.getSecretaryGrades());

    $('.table__body__row__item__publish').on('click', async e => {
        const target = e.currentTarget.parentElement;

        await gradeAuth.publishGrade(target.dataset.gradeid);
    });

    $('.table__body__row__item__delete').on('click', async e => {
        const target = e.currentTarget.parentElement;

        await gradeAuth.deleteGrade(target.dataset.gradeid);
    });

    $('.table__body__row__item__edit').on('click', async e => {
        const target = e.currentTarget.parentElement;

        // await gradeAuth.publishGrade(target.dataset.gradeid);
    });
};