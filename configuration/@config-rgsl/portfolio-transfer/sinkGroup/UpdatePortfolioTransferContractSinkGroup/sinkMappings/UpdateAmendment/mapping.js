'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const relationInfo = sinkExchange.resolveContext('relationInfo');

    let contractNumber;
    let configurationCodeName;
    let body;

    if (relationInfo.mainStateCode !== 'Activated') {
        const contractInfo = sinkExchange.resolveContext('contractInfo');
        contractNumber = input.contractNumber;
        configurationCodeName = relationInfo.mainConfigurationName;
        body = contractInfo.body;
    } else {
        contractNumber = sinkExchange.resolveContext('createdAmendmentNumber');
        configurationCodeName = sinkExchange.resolveContext('createdAmendmentConfigurationCodeName');
        body = sinkExchange.resolveContext('createdAmendmentBody');

        if (!body.amendmentData) {
            body.amendmentData = {};
        }
        if (!body.amendmentData.portfolioMovementAmendmentData) {
            body.amendmentData.portfolioMovementAmendmentData = {};
        }
        if (!body.amendmentData.portfolioMovementAmendmentData.mainAttributes) {
            body.amendmentData.portfolioMovementAmendmentData.mainAttributes = {};
        }
        body.amendmentData.portfolioMovementAmendmentData.mainAttributes.amendmentEffectiveDate = input.issueDate;
    }

    const enrichFields = [];
    if (body.mainInsuranceConditions.partner.partnerCode != input.partnerCode) {
        body.mainInsuranceConditions.partner = {
            partnerCode: input.partnerCode,
        };
        enrichFields.push('/mainInsuranceConditions[EnrichPartner]');
    }

    if (body.commission.agentAgreement.number != input.agentAgreementNumber) {
        body.commission.agentAgreement = {
            number: input.agentAgreementNumber,
        };
        enrichFields.push('/commission[EnrichAADocument]');
    }

    if (body.initiator.sadNumber != input.sadNumber) {
        body.initiator = {
            sadNumber: input.sadNumber,
        };
        enrichFields.push('/initiator[EnrichInitiator]');
    }

    const result = {
        number: contractNumber,
        configuration: {
            name: configurationCodeName,
            version: '1',
        },
        body: body,
        enrichFields: enrichFields,
    };

    return result;
};
