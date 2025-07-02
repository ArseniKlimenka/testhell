'use strict';

module.exports = function mapping(input) {

    return {
        data: {
            criteria: {
                number: input.contractNumber
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };
};
