'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    let result = undefined;

    if (input) {

        result = {
            endowmentNumber: input.number,
            contractNumber: input.body.contractNumber,
            eventType: input.body?.eventType,
            eventReason: input.body?.eventReason,
            eventDate: input.body?.applicationInfo?.eventDate ? DateTimeUtils.formatDate(input.body.applicationInfo.eventDate) : undefined,
            documentState: translationUtils.getTranslation(`document/${input.metadata.configuration.name}/1`, 'states', null, input.stateCode),
            documentStateCode: input.stateCode,
            risk: input.body.risk,
            endowmentBeneficiaries: input.body.endowmentBeneficiaries,
            contractCurrency: input.body.contractCurrency,
            risksInsuredSumByPeriod: input.body.risksInsuredSumByPeriod,
            statementApplicationDate: input.body?.applicationInfo?.statementApplicationDate ?
                DateTimeUtils.formatDate(input.body.applicationInfo.statementApplicationDate) :
                undefined,
            paymentLines: input.body.paymentLines,
            approvalConclusions: input.body.approvalConclusions
        };
    }

    return result;
};
