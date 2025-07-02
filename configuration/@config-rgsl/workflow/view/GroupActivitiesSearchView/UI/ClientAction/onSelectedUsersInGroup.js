'use strict';

module.exports = function onSelectedUsersInGroup(input, ambientProperties) {

    const selectedUser = input.getLookupSelection();
    const resultData = selectedUser[0]?.resultData;

    if (resultData?.userId) {

        input.context.viewContext.userToAssign = {
            userId: resultData.userId,
            username: resultData.username,
            displayName: resultData.displayName,
        };

        input.context.viewContext.userToAssignChanged = true;
    }

};
