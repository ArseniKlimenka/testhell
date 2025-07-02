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

    if (input.data?.criteria?.endowmentNumber) {

        output.parameters.endowmentNumber = input.data.criteria.endowmentNumber;
    }

    return output;
};
