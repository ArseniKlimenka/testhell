'use strict';

function getCommonBody(input, latestAgreementName = undefined) {

    const commonBody = {};
    commonBody.agreementName = 'Agreement';
    commonBody.validFrom = input.validity.startDate;
    commonBody.validTo = input.validity.endDate;
    commonBody.issueDate = input.validity.conclusionDate;
    commonBody.salesChannels = getSalesChannels(input);
    commonBody.organisationUnit = input.organisation.organisationUnit;
    commonBody.participants = getParticipants(input);
    commonBody.attributes = getAttributes(input);
    commonBody.rules = getCommissionRules(input);
    return commonBody;
}

function getAttributes(input, latestAgreementName = undefined) {

    const attributes = {
        mainAttributes: input.mainAttributes,
        additionalAttributes: input.additionalAttributes,
        organisation: input.organisation,
        validity: input.validity,
        participants: input.participants,
        changeAmendmentData: input.amendmentData?.changeAmendmentData,
        cancellationAmendmentData: input.amendmentData?.cancellationAmendmentData,
        latestAgreementName: latestAgreementName,
        budgetRule: input.budgetRule
    };

    return attributes;
}

function getCommissionRules(input) {

    const result = input.commissionRules.map(rule => {

        return {
            commissionType: 'base',
            currencyCode: input.mainAttributes.documentCurrency,
            attributes: rule
        };
    });

    return result;
}

function getParticipants(input) {

    const result = [];
    const agent = input.participants?.agent;

    if (agent) {

        const agentToAdd = {
            code: agent.serviceProviderCode,
            fullName: agent.fullName,
            role: 'Agent'
        };

        result.push(agentToAdd);
    }

    return result;
}

function getSalesChannels(input) {

    const result = [];
    const code = input.mainAttributes?.salesChannel?.code;

    if (code) {

        result.push(code);
    }

    return result;
}

module.exports = {
    getCommonBody
};
