module.exports = function initComments(input, ambientProperties) {

    // Obtain entity data. This is used for getting info if comments are allowed, getting already existing comments and entity number
    const entityData = input.rootContext;
    // input.rootContext here is parent (calling) entity data (claim, etc.) which contains comments data

    const viewData = this.getCurrentView().getContext();
    // viewData is CommentsView which is UI configuration for comments.

    // we initialize it with comments data obtained from parent entity
    viewData.Body = entityData.Comments;
    viewData.AllowComments = entityData.AllowComments;
    viewData.Number = entityData.Number;
};
