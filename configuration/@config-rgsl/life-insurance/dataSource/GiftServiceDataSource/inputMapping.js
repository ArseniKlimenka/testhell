'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.serviceName = null;

    if (input.data.criteria.serviceName) {
        output.parameters.serviceName = input.data.criteria.serviceName;
    }

    return output;

};
