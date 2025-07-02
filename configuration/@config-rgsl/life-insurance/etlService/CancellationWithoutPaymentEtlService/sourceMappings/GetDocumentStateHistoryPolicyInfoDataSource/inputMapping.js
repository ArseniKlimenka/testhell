'use strict';

module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                newState: "SentToPayment",
                transition: "OperationsDirectorApproval_to_SentToPayment"
            }
        }
    };
};
