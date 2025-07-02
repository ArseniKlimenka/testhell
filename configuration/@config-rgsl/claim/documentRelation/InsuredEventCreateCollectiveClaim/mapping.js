'use strict';

module.exports = function mapping(body) {

    const claimBody = {
        mainAttributes: {
            contract: {
                number: body.contract.number || body.contract.externalNumber,
                holder: body.contract.holder,
                configurationName: body.contract.configurationName || "None",
                configurationVersion: body.contract.configurationVersion
            },
            insuredEvent: {
                insuredEventNumber: this.businessContext.documentNumber,
                insuredEventReason: body.insuredEventReason,
                insuredEventType: body.insuredEventType,
                insuredEventDate: body.eventDateInfo.eventDate
            },
            diagnosis: body.diagnosis,
            diagnosisNote: body.diagnosisNote
        },
        claimAmounts: {
            fixedExchangeRate: body.fixedExchangeRate,
            useFixedExchangeRate: body.useFixedExchangeRate
        }
    };

    return { body: claimBody };
};
