'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            userId: undefined
        }
    };

    const criteria = input.data.criteria;

    if (criteria.userId) {
        output.parameters.userId = criteria.userId;
    } else {
        throw 'No criteria provided!';
    }

    return output;

};
