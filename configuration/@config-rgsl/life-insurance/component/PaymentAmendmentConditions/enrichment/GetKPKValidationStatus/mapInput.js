const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const docNumber = this.businessContext.documentNumber || "NoNumber";
    const docId = this.businessContext.entityId || "NoEntityId";

    const holder = body.technicalData.policyParties.holder;
    const insured = body.technicalData.policyParties.insuredPerson;
    const recipients = body.paymentAmendmentConditions.canellationRecipients ?? [];

    let partyCodes = [];
    partyCodes.push(holder.personCode);
    partyCodes.push(insured.personCode);

    const recipientsCodes = recipients.map(item => item.partyCode);
    partyCodes = partyCodes.concat(recipientsCodes);
    partyCodes = Array.from(new Set(partyCodes));

    const paticipantsData = body.technicalData.partiesInfo ?? [];

    const kpkRequestData = amendmentUtils.getKPKRequestData(body, paticipantsData, docId, docNumber);

    return {
        data: kpkRequestData
    };
};
