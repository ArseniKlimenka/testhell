'use strict';

module.exports = function mapping(input) {

    const contractNumber = input.contract?.number;

    if (!contractNumber) {

        return;
    }

    return {
        data: {
            criteria: {
                number: contractNumber
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };
};
