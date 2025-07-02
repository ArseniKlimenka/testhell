'use strict';

module.exports = function ClaimSentToPaymentDataSourceInputMapping(input) {

    const output = {
        parameters: {}
    };

    if (input.data.criteria) {
        output.parameters = { ...input.data.criteria };
    }

    return output;
};
