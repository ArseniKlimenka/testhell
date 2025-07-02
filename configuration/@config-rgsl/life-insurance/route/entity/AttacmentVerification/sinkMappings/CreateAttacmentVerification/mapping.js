const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');

module.exports = function mapping(input, sinkExchange) {
    const { body, number, configurationCodeName, commonBody } = input;

    if (sinkExchange.verificationAlreadyCreated) {
        return;
    }

    const issueFormCode = getValue(body, 'issueForm.code.issueFormCode', '');
    const isOffer = issueFormCode == 'offer';
    const skipMigrated = skipForMigrated(body);
    const isDBO = getValue(body, 'initiator.isDBO', false);

    if (isOffer || skipMigrated || isDBO) {
        return;
    }

    const policyHolder = body.policyHolder.partyData;
    const policyHolderFullName = policyHolder.partyFullName;
    const policyHolderCode = policyHolder.partyCode;
    const policyHolderType = policyHolder.partyType;
    const isPolicyHolder = getValue(body, 'insuredPerson.isPolicyHolder');
    const insuredPerson = getValue(body, 'insuredPerson.partyData');
    const insuredPersonFullName = getValue(body, 'insuredPerson.partyData.partyFullName');
    const insuredPersonCode = getValue(body, 'insuredPerson.partyData.partyCode');
    const sellerUsername = commonBody.transitionResult.attributes.sellerUsername;
    const partnerBusinessCode = body.mainInsuranceConditions.partner.partnerBusinessCode;

    return {
        body: {
            number, configurationCodeName,
            policyHolderFullName, policyHolderCode,
            policyHolderType, isPolicyHolder,
            insuredPersonFullName, insuredPersonCode,
            sellerUsername, partnerBusinessCode
        }
    };
};
