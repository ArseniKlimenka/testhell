'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            cancellationNumber: null
        },
        sort: {
            'SYS_CREATED_ON': 'asc'
        }
    };

    if (input.data?.criteria?.cancellationNumber) {

        output.parameters.cancellationNumber = input.data.criteria.cancellationNumber;
    }

    return output;
};
