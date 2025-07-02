'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            entityId: undefined
        }
    };

    const criteria = input.data.criteria;

    if (criteria.entityId) {

        output.parameters.entityId = criteria.entityId;
    }

    if (criteria.stateCode) {

        output.parameters.stateCode = criteria.stateCode;
    }

    return output;

};
