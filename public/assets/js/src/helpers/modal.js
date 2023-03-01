export const closeModal = (id) => {
    const modal = $(`#${id}-modal`);

    modal.addClass('modal--closed');

    setTimeout(() => modal.remove(),  300);
};

export const openModal = (id) => {
    const modal = $(`#${id}-modal`);

    modal.removeClass('modal--closed');
};

export default () => {
    $('.open-modal').on('click', (e) => {
        $(`#${e.currentTarget.dataset.modal}-modal`).removeClass('modal--closed');
    });

    $('.close-modal').on('click', (e) => {
        const modal = $(`#${e.currentTarget.dataset.modal}-modal`);

        modal.addClass('modal--closed');
    });
};