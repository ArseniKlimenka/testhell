"use strict";

module.exports = function mapping(input, sinkExchange) {

    const result = {
        businessNumber: this.businessContext.etlServiceInput.contractNumber,
        transition: {
            transitionName: "PremiumCalculating_To_Draft"
        }
    };

    return result;
};
