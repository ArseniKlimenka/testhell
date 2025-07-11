'use strict';

module.exports = function mapping(input) {

    const contractNumber = input.mainAttributes?.contract?.number;

    if (!contractNumber) {

        return;
    }

    return {
        data: {
            criteria: {
                number: contractNumber,
                isStrictNumber: true
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };
};
