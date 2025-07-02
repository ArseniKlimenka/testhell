"use strict";
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const claimConsts = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, sinkExchange) {

    const body = input.body;
    const contractData = sinkExchange.contractData;
    const cancellationBody = amendmentUtils.getDefaultCancellationBody(undefined, contractData.policyHolder);

    cancellationBody.technicalInformation = {
        creatorUsername: this.applicationContext.originatingUser.username,
        isCreatedByOperations: true,
        originalDocumentId: sinkExchange.originalContractId
    };

    cancellationBody.contractVersions = sinkExchange.contractVersions;
    cancellationBody.allocationsInfo = sinkExchange.allocations;

    const stateCode = input.state;
    const eventDate = body.mainAttributes.insuredEvent.insuredEventDate;

    const dateToSet = dateUtils.addDays(eventDate, 1);

    cancellationBody.basicAmendmentConditions = {
        receiveMethod: body.mainAttributes.applicationInfo.receiveMethod,
        applicationSignDate: dateToSet,
        applicationReceiveDate: dateToSet,
        validFrom: dateToSet,
        fullPackageReceiveDate: dateToSet,
        amendmentReason: amendmentConstants.amendmentReason.holderDeath,
        amendmentSubType: amendmentConstants.amendmentSubType.byCompanyDecision,
        applicant: body.mainAttributes.applicationInfo.applicant
    };

    cancellationBody.technicalData = {
        policyParties: {
            holder: {
                personCode: sinkExchange.foundHolderData[0].code,
                fullName: sinkExchange.foundHolderData[0].fullName
            }
        }
    };

    amendmentUtils.setCancellationPaymentLines(cancellationBody, contractData);
    cancellationBody.paymentAmendmentConditions.exchangeRate = sinkExchange.exchangeRate;

    if (stateCode === claimConsts.claimStates.sentToPayment) {

        cancellationBody.paymentAmendmentConditions.paymentLinesManualCorrection = true;
        cancellationBody.paymentAmendmentConditions.paymentLines.forEach(i => {
            i.paymentLineSum = 0;
            i.paymentLineSumInRub = 0;
        });
    }

    const configurationName = body.mainAttributes.contract.configurationName;
    const contractNumber = body.mainAttributes.contract.number;

    return {
        businessNumber: contractNumber,
        relation: {
            relationName: amendmentConstants.amendmentRelationsByBaseConfiguration[configurationName],
            configurationName: configurationName,
            configurationVersion: '1'
        },
        body: cancellationBody
    };
};
