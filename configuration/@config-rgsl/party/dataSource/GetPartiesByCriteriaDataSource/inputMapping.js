'use strict';

module.exports = function (input) {

    const output = {
        parameters:{}
    };

    if (input.data.criteria.partyCodes && input.data.criteria.partyCodes.length > 0) {

        output.parameters.partyCodes = input.data.criteria.partyCodes;
    }

    if (input.data.criteria.showDuplicates) {

        output.parameters.showDuplicates = input.data.criteria.showDuplicates;
    }

    return output;

};
