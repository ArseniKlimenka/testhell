module.exports = async function arrayOperationHandler(input, ambientProperties) {
    const { gridData, affectedRow, operationType } = input;

    // Comment UI (CommentsView) and CommentsContainer which is InlineView don't have 'commentManager'. Only parent entity has it.
    const commentsContainerView = this.view.getParentView();

    const callingEntityView = commentsContainerView;
    // callingEntityView is calling entity's (claim, policy, etc) 'this.view' which contains 'commentManager'

    if (operationType == 'Add') {
        const comment = await callingEntityView.commentManager.addComment(affectedRow.comment);
        gridData[gridData.length - 1] = comment;
        callingEntityView.rebind();
    } else if (operationType == 'Edit') {
        await callingEntityView.commentManager.editComment(affectedRow.id, affectedRow.comment);
        const comment = gridData.find(x => x.id === affectedRow.id);

        comment.comment = affectedRow.comment;
        comment.modifiedOn = new Date().toISOString();

        callingEntityView.rebind();

    } else if (operationType == 'Delete') {
        await callingEntityView.commentManager.deleteComment(affectedRow.id);
    }
};
