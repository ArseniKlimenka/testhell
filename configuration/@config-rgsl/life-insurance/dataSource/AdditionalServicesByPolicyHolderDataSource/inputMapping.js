'use strict';

module.exports = function (input) {

    const output = {
        parameters: {}
    };

    if (input.data && input.data.criteria && input.data.criteria.policyHolderPartyCode) {

        output.parameters.policyHolderPartyCode = input.data.criteria.policyHolderPartyCode;
    }

    if (input.data && input.data.criteria && input.data.criteria.number) {

        output.parameters.number = input.data.criteria.number;
    }

    if (!output.parameters.policyHolderPartyCode) {

        throw 'Mandatory parameter policyHolderPartyCode is absent!';
    }

    return output;
};
