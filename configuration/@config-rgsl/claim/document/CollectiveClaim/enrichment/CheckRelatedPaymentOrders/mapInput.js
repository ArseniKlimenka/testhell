'use strict';

module.exports = function mapping(input) {

    const paymentOrderNumber = input.claimAmounts.assignedPaymentOrderNumber ?? '';

    return {
        data: {
            criteria: {
                poNumbers: [paymentOrderNumber],
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };
};
