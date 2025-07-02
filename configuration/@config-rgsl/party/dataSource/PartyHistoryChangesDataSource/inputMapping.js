'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            partyId: null
        }
    };

    if (input.data.criteria.partyId) {
        output.parameters.partyId = input.data.criteria.partyId;
    }

    if (!output.parameters.partyId) {
        throw 'No criteria provided!';
    }

    return output;
};
