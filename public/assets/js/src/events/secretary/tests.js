import testAuth from "../../auth/Test";

export default async () => {
    if (!targetPage || targetPage != 'secretary-tests')
        return;

    $('#tests').html(await testAuth.getSecretaryTests());

    $('.table__body__row__item__delete').on('click', async e => {
        const target = e.currentTarget.parentElement;

        await testAuth.deleteTest(target.dataset.testid);
    });

    $('.table__body__row__item__publish').on('click', async e => {
        const target = e.currentTarget.parentElement;

        await testAuth.publishTest(target.dataset.testid);
    });
};