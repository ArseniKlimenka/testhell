'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.orgUnitCode = null;

    if (input.data.criteria.orgUnitCode) {
        output.parameters.orgUnitCode = input.data.criteria.orgUnitCode;
    }

    return output;

};
