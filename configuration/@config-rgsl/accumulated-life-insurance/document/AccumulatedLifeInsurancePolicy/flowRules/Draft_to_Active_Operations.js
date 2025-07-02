const insuredPersonHelper = require('@config-rgsl/life-insurance/lib/insuredPersonHelper');

/**
 * @errorCode {errorCode} Draft_to_Active_Operations_contractAttachment_contractSigned
 * @errorCode {errorCode} Draft_to_Active_Operations_contractAttachment_bankNotificationForBFKOPartner
 * @errorCode {errorCode} Draft_to_Active_Operations_contractAttachment_servicesMemo
 * @errorCode {errorCode} Draft_to_Active_Operations_policyHolderAttachment_passport
 * @errorCode {errorCode} Draft_to_Active_Operations_policyHolderAttachment_financialQuestionary
 * @errorCode {errorCode} Draft_to_Active_Operations_policyHolderAttachment_financialQuestionary_wrongDate
 * @errorCode {errorCode} Draft_to_Active_IdentityDocumentBelow14Issue
 * @errorCode {errorCode} Draft_to_Active_IdentityDocumentAbove14Issue
 */


module.exports = function rule(input) {

    const validationErrors = [];

    return validationErrors;

};
