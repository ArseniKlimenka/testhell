module.exports = function checkIfRowActionIsAllowed(input, ambientProperties) {

    const currentUserName = ambientProperties.applicationContext.currentUser().getUserName();
    const affectedRow = input.affectedRow;
    const affectedRowAuthor = affectedRow.author;

    if ((affectedRowAuthor != currentUserName)) {

        return {

            delete: false,
            edit: false
        };
    }

    return true;

};
