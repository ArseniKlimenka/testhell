'use strict';

module.exports = function risksOnPrepareAddedRow(input, ambientProperties) {

    input.affectedRow.isAdditional = input.operationType == 'Add';
    return true;
};
