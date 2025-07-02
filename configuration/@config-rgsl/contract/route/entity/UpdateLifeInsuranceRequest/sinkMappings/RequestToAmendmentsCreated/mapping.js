'use strict';

module.exports = function mapInput(input, sinkExchange) {

    if (sinkExchange?.requestLastAmendment) {

        const result = {
            businessNumber: sinkExchange.requestNumber,
            transition: {
                transitionName: "CreateAmendment_to_AmendmentsCreated",
                configurationName: "LifeInsuranceRequest",
                configurationVersion: "1"
            }
        };

        return result;

    }

};
