export const createModuleItem = (type = 'course') => {
    const moduleCount = parseInt($('#module-count').val()) + 1;

    const itemTemplate = `
        <div class="input-wrapper" id="module-item-${moduleCount}" style="margin-top: 1.6rem;">
            <label for="${type}-module-${moduleCount}" id="${type}-module-${moduleCount}-label">Module: ${moduleCount}</label>
            <div class="flex flex--a-center">
                <select id="${type}-module-${moduleCount}" class="input-wrapper__input modules__item" style="flex: 1;"></select>
                <svg class="image--icon" style="margin-left: 1rem; fill: #b68c8c;" id="delete-item-${moduleCount}">
                    <use href="#cancel"></use>
                </svg>
            </div>
        </div>
    `;

    const parent = $(`.modules`)[0];

    $(itemTemplate).appendTo(parent);

    $(`#${type}-module-${moduleCount}`).html($(`#${type}-module-1`).html())

    $(`#delete-item-${moduleCount}`).on('click', (e) => {
        const itemId = e.currentTarget.id.split('-')[2];

        removeModuleItem(itemId, type);
    });

    $('#module-count').val(moduleCount);
};

const rename = (itemId, moduleCount, type) => {
    itemId = parseInt(itemId);

    for (let i = moduleCount; i > itemId; i--) {
        const oldId = i,
            currentId = oldId - 1;

        const item = $(`#module-item-${oldId}`)[0];
        item.id = `module-item-${currentId}`;

        const label = $(`#${type}-module-${oldId}-label`)[0];
        $(label).attr('for', `#${type}-module-${currentId}`);
        label.id = `${type}-module-${currentId}-label`;
        label.innerText = `Module: ${currentId}`;

        const select = $(`#${type}-module-${oldId}`)[0];
        select.id = `${type}-module-${currentId}`;

        const deleteBtn = $(`#delete-item-${oldId}`);
        deleteBtn[0].id = `delete-item-${currentId}`;

        // remove previous event, because it points to an old id
        deleteBtn.off('click');

        // set new event pointing to current event
        $(deleteBtn).on('click', () => {
            removeModuleItem(currentId, type);
        });
    }

    $('#module-count').val(moduleCount - 1);
};

export const removeModuleItem = (itemId, type = 'course') => {
    const moduleCount = parseInt($('#module-count').val());

    if (moduleCount == 1)
        return;

    $(`#module-item-${itemId}`).remove();

    rename(itemId, moduleCount, type);
};