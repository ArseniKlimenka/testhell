"use strict";

const { paymentOrderStates } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    input.tempTechnicalData.isEnabledFlowToSentToPaymentToClaimManager
        = dataSource.data.every(p => p.resultData.stateCode == paymentOrderStates.Cancelled)
            || dataSource.data.length == 0;

};
