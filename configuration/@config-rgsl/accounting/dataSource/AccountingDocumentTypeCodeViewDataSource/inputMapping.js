'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.documentTypeCode = null;
    output.parameters.documentTypeCodes = null;
    output.parameters.viewCode = null;
    output.parameters.viewCodes = null;

    if (input.data.criteria.documentTypeCode) {

        output.parameters.documentTypeCode = input.data.criteria.documentTypeCode;
    }

    if (input.data.criteria.documentTypeCodes) {

        output.parameters.documentTypeCodes = input.data.criteria.documentTypeCodes;
    }

    if (input.data.criteria.viewCode) {

        output.parameters.viewCode = input.data.criteria.viewCode;
    }

    if (input.data.criteria.viewCodes) {

        output.parameters.viewCodes = input.data.criteria.viewCodes;
    }

    return output;
};
