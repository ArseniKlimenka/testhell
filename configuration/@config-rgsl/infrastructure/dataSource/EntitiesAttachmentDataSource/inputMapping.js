'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            entitiesIds: undefined
        }
    };

    const criteria = input.data?.criteria;

    if (criteria?.entitiesIds?.length > 0) {
        output.parameters.entitiesIds = JSON.stringify(input.data.criteria.entitiesIds);
    }

    if (criteria?.documentNumber) {
        output.parameters.documentNumber = criteria.documentNumber;
    }

    if (!output.parameters.entitiesIds) {
        throw 'No criteria provided!';
    }

    return output;

};
