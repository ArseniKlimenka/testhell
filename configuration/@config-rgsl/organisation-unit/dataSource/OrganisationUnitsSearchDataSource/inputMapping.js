'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.name = null;
    output.parameters.code = null;

    if (input.data.criteria.name) {
        output.parameters.name = '%' + input.data.criteria.name + '%';
    }

    if (input.data.criteria.code) {
        output.parameters.code = '%' + input.data.criteria.code + '%';
    }

    return output;

};
