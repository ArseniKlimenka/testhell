const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const insuredPersonHelper = require('@config-rgsl/life-insurance/lib/insuredPersonHelper');

/**
    * @errorCode {errorCode} Draft_to_Active_IdentityDocumentBelow14Issue
    * @errorCode {errorCode} Draft_to_Active_IdentityDocumentAbove14Issue
 */

module.exports = function rule(input) {

    const validationErrors = [];
    const body = input?.body;
    const insuredPersonPartyId = body?.insuredPerson?.partyData?.partyId;
    const attachmentsPackage = body?.attachmentsPackage ?? [];
    const isSkipAttachmentsValidationAPI = this.applicationContext.originatingUser.applicationRoles.some(x => x == "SkipAttachmentsValidationAPI");

    if (!isSkipAttachmentsValidationAPI) {
        if (insuredPersonHelper.isIdentityDocumentBelow14Issue(body, attachmentsPackage, insuredPersonPartyId)) {
            validationErrors.push({
                errorCode: "Draft_to_Active_IdentityDocumentBelow14Issue"
            });
        }

        if (insuredPersonHelper.isIdentityDocumentAbove14Issue(body, attachmentsPackage, insuredPersonPartyId)) {
            validationErrors.push({
                errorCode: "Draft_to_Active_IdentityDocumentAbove14Issue"
            });
        }
    }

    return validationErrors;

};
