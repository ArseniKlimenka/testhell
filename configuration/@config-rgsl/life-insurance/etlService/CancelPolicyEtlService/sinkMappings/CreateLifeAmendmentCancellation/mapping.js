'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.canCreateCancellation) {

        return null;
    }

    const stateBody = (sinkExchange.latestContractData.seqNumber == 0 ? sinkExchange.latestContractData.body : sinkExchange.latestContractData.snapshotBody)
    ?? sinkExchange.latestContractData.body;

    const deadLineDate = dateUtils.addDays(input.deadLineDate, 1);
    const policyHolder = stateBody.policyHolder;

    const body = amendmentUtils.getDefaultCancellationBody(this, policyHolder);

    body.basicAmendmentConditions.receiveMethod = 'email';

    body.basicAmendmentConditions.validFrom = deadLineDate;
    body.basicAmendmentConditions.applicationSignDate = deadLineDate;
    body.basicAmendmentConditions.applicationReceiveDate = deadLineDate;
    body.basicAmendmentConditions.fullPackageReceiveDate = deadLineDate;

    body.basicAmendmentConditions.amendmentReason = 'byCompany';
    body.basicAmendmentConditions.amendmentSubType = 'byCompanyDecision';

    body.paymentAmendmentConditions.exchangeRate = sinkExchange.exchangeRate;

    body.contractVersions = sinkExchange.contractVersions ?? [];
    body.allocationsInfo = sinkExchange.allocations ?? [];

    body.technicalData = {};
    body.technicalData.policyParties = {};
    body.technicalData.policyParties.holder = {};
    body.technicalData.policyParties.holder.personCode = sinkExchange.foundHolderData[0].code;
    body.technicalData.policyParties.holder.fullName = sinkExchange.foundHolderData[0].fullName;

    amendmentUtils.setCancellationPaymentLines(body, stateBody);

    return {
        body,
        businessNumber: input.contractNumber,
        relation: {
            configurationName: input.configurationName
        }
    };
};
