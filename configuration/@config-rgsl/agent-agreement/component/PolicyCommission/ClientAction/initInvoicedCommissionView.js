'use strict';

module.exports = function initInvoicedCommissionView(input) {

    if (input.context.Number) {

        this.getCurrentView().setSearchRequest({ data: { criteria: { contractNumber: input.context.Number } } });
        this.getCurrentView().search();
    }
};
