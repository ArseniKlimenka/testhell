'use strict';

const { paymentFrequency } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const insuredPersonHelper = require('@config-rgsl/life-insurance/lib/insuredPersonHelper');


/**
 * @errorCode {errorCode} Draft_to_Active_contractAttachment_contractSigned
 * @errorCode {errorCode} Draft_to_Active_contractAttachment_bankNotificationForBFKOPartner
 * @errorCode {errorCode} Draft_to_Active_contractAttachment_servicesMemo
 * @errorCode {errorCode} Draft_to_Active_insuredPersonAttachment_passport
 * @errorCode {errorCode} Draft_to_Active_policyHolderAttachment_passport
 * @errorCode {errorCode} Draft_to_Active_policyHolderAttachment_financialQuestionary
 * @errorCode {errorCode} Draft_to_Active_policyHolderAttachment_financialQuestionary_wrongDate
 * @errorCode {errorCode} Draft_to_Active_IdentityDocumentBelow14Issue
 * @errorCode {errorCode} Draft_to_Active_IdentityDocumentAbove14Issue
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const body = input?.body;
    const businessContext = this?.businessContext;

    const contractId = businessContext?.entityId;
    const policyHolderPartyId = body?.policyHolder?.partyData?.partyId;
    const insuredPersonPartyId = body?.insuredPerson?.partyData?.partyId;
    const attachmentsPackage = body?.attachmentsPackage ?? [];
    const paymentFrequencyCode = body?.basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const isPolicyHolder = body?.insuredPerson?.isPolicyHolder;
    const lastUpdateDate = body?.policyHolder?.partyData?.partyBody?.finKnowledgeQuestionnaire?.lastUpdateDate;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const BFKOPartner = body?.mainInsuranceConditions?.partner?.partnerBusinessCode == '249411';
    const issueFormCode = body?.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';
    const issueDate = body?.basicConditions?.issueDate;
    const productConf = body?.productConfiguration ?? {};
    const isEFR = body?.technicalInformation?.apiSender == 'API_EFR';
    const isSkipAttachmentsValidationAPI = this.applicationContext.originatingUser.applicationRoles.some(x => x == "SkipAttachmentsValidationAPI");

    if (!isSkipAttachmentsValidationAPI) {

        if (!isEPolicy && !attachmentsPackage.some(item => item.entityId.toUpperCase() == contractId.toUpperCase() && item.attachmentType == 'contractSigned')) {
            validationErrors.push({
                errorCode: "Draft_to_Active_contractAttachment_contractSigned"
            });
        }

        if (!isEPolicy && BFKOPartner && !attachmentsPackage.some(item => item.entityId.toUpperCase() == contractId.toUpperCase() && ((item.attachmentType == 'bankNotification') || (item.attachmentType == 'personalData' || item.attachmentType == 'noticeFinServices')))) {
            validationErrors.push({
                errorCode: "Draft_to_Active_contractAttachment_bankNotificationForBFKOPartner"
            });
        }

        if (!isEPolicy && !attachmentsPackage.some(item => item.entityId.toUpperCase() == policyHolderPartyId.toUpperCase() && item.attachmentType == 'passport')) {
            validationErrors.push({
                errorCode: "Draft_to_Active_policyHolderAttachment_passport"
            });
        }

        if (!isEPolicy && paymentFrequencyCode == paymentFrequency.oneTime.code && productConf.showFinKnowledgeQuestionnaire) {
            if (!isEFR) {

                if (!attachmentsPackage.some(item => item.entityId.toUpperCase() == policyHolderPartyId.toUpperCase() && item.attachmentType == 'financialQuestionary')) {
                    validationErrors.push({
                        errorCode: "Draft_to_Active_policyHolderAttachment_financialQuestionary"
                    });
                }
                if (!attachmentsPackage.some(item => item.attachmentType == 'financialQuestionary' && dateHelper.isAfterOrEqual(item.createdOn, lastUpdateDate))) {
                    validationErrors.push({
                        errorCode: "Draft_to_Active_policyHolderAttachment_financialQuestionary_wrongDate"
                    });
                }
            }
        }

        if (!isEPolicy && insuredPersonHelper.isIdentityDocumentBelow14Issue(body, attachmentsPackage, insuredPersonPartyId)) {
            validationErrors.push({
                errorCode: "Draft_to_Active_IdentityDocumentBelow14Issue"
            });
        }

        if (!isEPolicy && insuredPersonHelper.isIdentityDocumentAbove14Issue(body, attachmentsPackage, insuredPersonPartyId)) {

            validationErrors.push({
                errorCode: "Draft_to_Active_IdentityDocumentAbove14Issue"
            });
        }
    }

    return validationErrors;
};
