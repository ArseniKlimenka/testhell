const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(lineInput, sinkExchange) {

    // called from route, but we need to provire RU translations
    this.applicationContext.locale = "ru-RU";
    // calc dynamic values
    const lineData = lineInput.data;
    const originalContractVersion = sinkExchange.originalContractVersion;

    const applicationSignDate = lineData.applicationSignDate;
    const actualCoolOffEndDate = sinkExchange.actualCoolOffEndDate;

    if (!actualCoolOffEndDate || !applicationSignDate || applicationSignDate > actualCoolOffEndDate) {

        throw "Период охлаждения истек!";
    }

    const validFrom = getValue(originalContractVersion, 'commonBody.startDate');
    const applicantPartyId = originalContractVersion?.body?.policyHolder?.partyData?.partyId;
    const applicantPartyCode = getValue(originalContractVersion, 'body.policyHolder.partyData.partyCode');
    const applicantPartyType = getValue(originalContractVersion, 'body.policyHolder.partyData.partyType');
    const applicantFullName = getValue(originalContractVersion, 'body.policyHolder.partyData.partyFullName');
    const cancellationBankAccountNumber = lineData.bankAccountNumber;
    const applicantBankAccounts = getValue(sinkExchange, 'party.body.partyBankAccounts', []);
    const applicantBankAccount = applicantBankAccounts.find(item => item.number == cancellationBankAccountNumber);

    // fill body
    const body = amendmentConstants.LifeInsuranceCancellationDefaultValue;

    body.basicAmendmentConditions.amendmentSubType = amendmentConstants.amendmentSubType.byClientDecision;
    body.basicAmendmentConditions.amendmentReason = amendmentConstants.amendmentReason.byClientCoolOff;
    body.basicAmendmentConditions.receiveMethod = amendmentConstants.receiveMethod.partner;
    body.basicAmendmentConditions.applicationSignDate = lineData.applicationSignDate;
    body.basicAmendmentConditions.issueDate = DateTimeUtils.dateNow();
    body.basicAmendmentConditions.applicationReceiveDate = DateTimeUtils.dateNow();
    body.basicAmendmentConditions.fullPackageReceiveDate = DateTimeUtils.dateNow();
    body.basicAmendmentConditions.validFrom = validFrom;

    body.paymentAmendmentConditions.canellationRecipients = [{
        recipientReason: {
            code: '006',
            description: 'Страхователь'
        },
        recipientPaymentType: {
            code: '005',
            description: 'На расчетный счет'
        },
        amountToPayPercetage: 1,
        amountToPay: 0,
        amountToPayInRubCurrency: 0,
        pitAmount: 0,
        pitAmountInRubCurrency: 0,
        partyId: applicantPartyId,
        partyCode: applicantPartyCode,
        partyType: applicantPartyType,
        fullName: applicantFullName,
        bankAccount: applicantBankAccount
    }];

    body.contractVersions = sinkExchange.contractVersions ?? [];

    // prepare contractNumber
    const contractNumber = lineData.policySeries + '-' + lineData.policyNumber;

    // fill result
    const result = {
        businessNumber: contractNumber,
        relation: {
            relationName: 'CreateLifeAmendmentCancellation',
            configurationName: 'CreditLifeInsurancePolicy',
            configurationVersion: '1'
        },
        body: body
    };

    return result;
};
