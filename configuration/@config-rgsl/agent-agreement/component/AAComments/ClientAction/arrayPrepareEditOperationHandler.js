'use strict';

module.exports = function arrayPrepareEditOperationHandler(input, ambientProperties) {

    const { affectedRow } = input;

    if (affectedRow.author != ambientProperties.applicationContext.currentUser().getUserName() || affectedRow.id === -1) {

        return false;
    }

    return true;
};
