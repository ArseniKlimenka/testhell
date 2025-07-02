module.exports = function checkIfRowActionIsAllowed(input, ambientProperties) {

    const currentUserName = ambientProperties.applicationContext.currentUser().getUserName();
    const allowComments = input.context.AllowComments;
    const affectedRow = input.affectedRow;
    const affectedRowId = affectedRow.id;
    const affectedRowAuthor = affectedRow.author;

    const allComments = input.context.Body || [];
    const lastId = allComments && allComments.length > 0 && allComments[allComments.length - 1].id || 0;

    if (!allowComments || (affectedRowAuthor != currentUserName) || (affectedRowId != lastId)) {
        return {
            delete: false,
            edit: false
        };
    }

    return true;

};
