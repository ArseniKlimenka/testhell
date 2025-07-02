module.exports = async function actItemsChanged(input, ambientProperties) {

    if (input.context.Number) {
        this.view.reloadEntity();
    }
};
