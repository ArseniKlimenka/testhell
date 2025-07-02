'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    return {
        businessNumber: lineInput.poNumber,
        transition: {
            configurationName: 'PaymentOrder',
            transitionName: 'Draft_to_Approved',
        }
    };
};
