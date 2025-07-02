'use strict';

module.exports = function initAmountOfPremiumsPaidView(input) {

    this.getCurrentView().setSearchRequest({
        data: {
            criteria: {
                contractNumber: input.context.Body.contract?.number,
                accountingYear: input.context.Body.accountingYear?.year
            }
        }
    });

    this.getCurrentView().search();
};
