'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.employeeCode = null;

    if (input.data.criteria.employeeCode) {
        output.parameters.employeeCode = input.data.criteria.employeeCode;
    }

    return output;

};
