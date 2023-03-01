export default (parentId, error) => {
    const parent = $(`#${parentId}`);

    parent.show();
    $('.error-container__p__text', parent[0]).html(error);
};