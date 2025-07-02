'use strict';

module.exports = function mapping(input) {

    let paymentOrderNumbers = input.claimBeneficiaries
        .filter((x) => x.assignedPaymentOrderNumber)
        .map((x) => x.assignedPaymentOrderNumber);

    if (!paymentOrderNumbers || [...paymentOrderNumbers].length === 0) {

        paymentOrderNumbers = [''];
    } else {

        paymentOrderNumbers = [...paymentOrderNumbers];
    }

    return {
        data: {
            criteria: {
                poNumbers: paymentOrderNumbers,
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };
};
