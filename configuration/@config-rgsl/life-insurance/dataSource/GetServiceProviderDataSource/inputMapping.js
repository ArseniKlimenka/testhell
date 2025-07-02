'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.serviceProviderCode = null;
    output.parameters.partnerCode = null;
    output.parameters.configurationCodeName = null;

    const criteria = input.data.criteria;

    if (criteria.serviceProviderCode) {
        output.parameters.serviceProviderCode = criteria.serviceProviderCode;
    }

    if (criteria.partnerCode) {
        output.parameters.partnerCode = criteria.partnerCode;
    }

    if (criteria.configurationCodeName) {
        output.parameters.configurationCodeName = criteria.configurationCodeName;
    }

    return output;

};
