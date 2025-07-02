'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { LocalDate } = require('@js-joda/core');
const currentDate = LocalDate.now().toString();
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const context = input?.context ?? this?.businessContext;
    const body = context?.Body ?? context?.rootData;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const currencyCode = body.basicConditions?.currency?.currencyCode;
    const issueDate = body.basicConditions?.issueDate ?? DateTimeUtils.newDateAsString();
    const endDate = body.policyTerms?.endDate ?? DateTimeUtils.newDateAsString();
    const productConf = body?.productConfiguration ?? {};
    const cumulationProductGroup = productConf?.cumulationProductGroup;
    const risks = body.risks;
    const documentNumber = context?.Number ?? context?.documentNumber;
    const documentConfigurationCodeName = context?.ConfigurationCodeName ?? context?.configurationCodeName;

    const policyHolder = body?.policyHolder;
    const policyHolderPartyCode = policyHolder?.partyData?.partyCode;
    const policyHolderPartyType = policyHolder?.participantType;
    const policyHolderDateOfBirth = policyHolder?.partyData?.dateOfBirth;
    const policyHolderAgeOnIssueDate = DateTimeUtils.getYearDifference(policyHolderDateOfBirth, issueDate);

    const insuredPerson = body.insuredPerson;
    const insuredPersonPartyCode = insuredPerson?.partyData?.partyCode;
    const insuredPersonPartyType = insuredPerson?.participantType;
    const insuredPersonDateOfBirth = insuredPerson?.partyData?.dateOfBirth;
    const insuredPersonAgeOnIssueDate = DateTimeUtils.getYearDifference(insuredPersonDateOfBirth, issueDate);

    if (documentConfigurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy) {
        return;
    }

    if (!currentDate || !productCode || !currencyCode || !issueDate || !endDate || !cumulationProductGroup ||
        !policyHolderPartyCode || !insuredPersonPartyCode || !risks || !documentNumber || !documentConfigurationCodeName) {
        return;
    }

    return {
        currentDate,
        productCode,
        currencyCode,
        issueDate,
        endDate,
        cumulationProductGroup,
        policyHolder: {
            partyCode: policyHolderPartyCode,
            participantType: policyHolderPartyType,
            dateOfBirth: policyHolderDateOfBirth,
            ageOnIssueDate: policyHolderAgeOnIssueDate
        },
        insuredPerson: {
            partyCode: insuredPersonPartyCode,
            participantType: insuredPersonPartyType,
            dateOfBirth: insuredPersonDateOfBirth,
            ageOnIssueDate: insuredPersonAgeOnIssueDate
        },
        risks,
        documentNumber,
        documentConfigurationCodeName
    };
};
