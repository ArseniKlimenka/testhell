'use strict';

module.exports = function mapping(input) {

    const output = {
        input: {
            data: {
                criteria: {
                    number: input.contractNumber,
                    isStrictNumber: true
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };

    return output;
};
