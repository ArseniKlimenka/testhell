'use strict';

module.exports = function enableAssignActivityButton(input, ambientProperties) {

    const userToAssign = input.context.viewContext.userToAssign;
    return userToAssign?.userId;
};
