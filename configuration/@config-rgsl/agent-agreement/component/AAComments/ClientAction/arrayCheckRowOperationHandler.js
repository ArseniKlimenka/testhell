'use strict';

module.exports = function arrayCheckRowOperationHandler(input, ambientProperties) {

    const { affectedRow } = input;

    if (affectedRow && affectedRow.author != ambientProperties.applicationContext.currentUser().getUserName()) {

        return {
            delete: false,
            edit: false
        };
    }

    return true;
};
