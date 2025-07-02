module.exports = function fileDeleted(input, ambientProperties) {
    input.context.Body.itemCount = undefined;
    this.view.rebind();
};
