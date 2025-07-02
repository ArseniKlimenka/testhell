'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
/**
 * @errorCode {errorCode} ePolicy_contractAttachment_bankNotificationForBFKOPartner
 * @errorCode {errorCode} ePolicy_insuredPersonAttachment_passport
 * @errorCode {errorCode} ePolicy_policyHolderAttachment_passport
 * @errorCode {errorCode} ePolicy_policyHolderAttachment_passport_error
 * @errorCode {errorCode} ePolicy_policyHolderAttachment_financialQuestionary
 * @errorCode {errorCode} ePolicy_policyHolderAttachment_financialQuestionary_wrongDate
 * @errorCode {errorCode} AttachmentFormSeventyPlusShouldBeAdded
 * @errorCode {errorCode} AttachmentManagingDirectorDRPKShouldBeAdded
 * @errorCode {errorCode} AttachmentManagingDirectorUPIPShouldBeAdded
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const body = this.businessContext.rootData;
    const businessContext = this.businessContext;
    const isOperationsActor = (this.applicationContext.actor == lifeInsuranceConstants.actor.Operations);
    const documentContractType = this.businessContext.configurationDimensions.contractType;
    const isCollectivePolicy = (this.businessContext.configurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy);

    const attachmentsPackage = body.attachmentsPackage ?? [];
    const attachmentFormSeventyPlusExists = attachmentsPackage.some(item => item.attachmentType == 'formSeventyPlus');
    const attachmentManagingDirectorDRPKExists = attachmentsPackage.some(item => item.attachmentType == 'managingDirectorDRPK');
    const attachmentManagingDirectorUPIPExists = attachmentsPackage.some(item => item.attachmentType == 'managingDirectorUPIP');

    const contractId = businessContext.entityId;
    const policyHolderPartyId = body.policyHolder?.partyData?.partyId;
    const insuredPersonPartyId = body.insuredPerson?.partyData?.partyId;
    const paymentFrequencyCode = body.basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const isPolicyHolder = body.insuredPerson?.isPolicyHolder;
    const lastUpdateDate = body.policyHolder?.partyData?.partyBody?.finKnowledgeQuestionnaire?.lastUpdateDate;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const salesSegment = body.mainInsuranceConditions?.insuranceProduct?.salesSegment;
    const productGroup = body.mainInsuranceConditions?.insuranceProduct?.productGroup;
    const isRiskProductGroup = productGroup == 'risk';
    const skipSeventyPlusDRPKValid = lifeInsuranceConstants.productGroupArray.SKIP_SEVENTY_PLUS_VALID.includes(productCode);
    const BFKOPartner = body.mainInsuranceConditions?.partner?.partnerBusinessCode == lifeInsuranceConstants.partnerCode.BFKO;
    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == lifeInsuranceConstants.issueForm.ePolicy.issueFormCode;
    const issueDate = body.basicConditions?.issueDate;
    const isEFR = body.technicalInformation?.apiSender == 'API_EFR';

    const policyHolderDateOfBirth = body.policyHolder?.partyData?.dateOfBirth;
    const policyHolderAgeOnIssueDate = DateTimeUtils.getYearDifference(policyHolderDateOfBirth, issueDate);
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;
    const isVIPVTBSegment = ['VIPVTB', 'VIPVTBNT'].includes(salesSegment);
    const isPremiumVTBSegment = ['PremiumVTB', 'PremiumVTBNT'].includes(salesSegment);
    const policyHolderPassport = lifeInsuranceConstants.productGroupArray.PH_ATTACHMENT_PASSPORT.includes(productCode);

    if (isEPolicy && documentContractType == lifeInsuranceConstants.contractType.Policy && BFKOPartner && !attachmentsPackage.some(item => item.entityId.toUpperCase() == contractId.toUpperCase() && ((item.attachmentType == 'bankNotification') || (item.attachmentType == 'personalData' || item.attachmentType == 'noticeFinServices')))) {
        validationErrors.push({
            errorCode: "ePolicy_contractAttachment_bankNotificationForBFKOPartner",
            severity: 'Note'
        });
    }

    if (isEPolicy && !policyHolderPassport && documentContractType == lifeInsuranceConstants.contractType.Policy && !isPolicyHolder && !attachmentsPackage.some(item => item.entityId.toUpperCase() == insuredPersonPartyId.toUpperCase() && item.attachmentType == 'passport')) {
        validationErrors.push({
            errorCode: "ePolicy_insuredPersonAttachment_passport",
            severity: 'Note'
        });
    }

    if (isEPolicy && !policyHolderPassport && documentContractType == lifeInsuranceConstants.contractType.Policy && !attachmentsPackage.some(item => item.entityId.toUpperCase() == policyHolderPartyId.toUpperCase() && item.attachmentType == 'passport')) {
        validationErrors.push({
            errorCode: "ePolicy_policyHolderAttachment_passport",
            severity: 'Note'
        });
    }

    if (isEPolicy && documentContractType == lifeInsuranceConstants.contractType.Policy && paymentFrequencyCode == lifeInsuranceConstants.paymentFrequency.oneTime.code && productConf.showFinKnowledgeQuestionnaire) {
        if (!isEFR) {
            if (!attachmentsPackage.some(item => item.entityId.toUpperCase() == policyHolderPartyId.toUpperCase() && item.attachmentType == 'financialQuestionary')) {
                validationErrors.push({
                    errorCode: "ePolicy_policyHolderAttachment_financialQuestionary",
                    severity: 'Note'
                });
            }
            if (!attachmentsPackage.some(item => item.attachmentType == 'financialQuestionary' && DateTimeUtils.isAfterOrEqual(item.createdOn, lastUpdateDate))) {
                validationErrors.push({
                    errorCode: "ePolicy_policyHolderAttachment_financialQuestionary_wrongDate",
                    severity: 'Note'
                });
            }
        }
    }

    if (isEPolicy && policyHolderPassport && !attachmentsPackage.some(item => item.attachmentType == 'passport')) {
        validationErrors.push({
            errorCode: "ePolicy_policyHolderAttachment_passport_error"
        });
    }

    if (policyHolderAgeOnIssueDate >= 70 && !isRiskProductGroup && !isOperationsActor) {

        if (isVIPVTBSegment) {

            if (!attachmentFormSeventyPlusExists) {
                validationErrors.push({
                    errorCode: 'AttachmentFormSeventyPlusShouldBeAdded'
                });
            }

            if (!attachmentManagingDirectorDRPKExists && !skipSeventyPlusDRPKValid) {
                validationErrors.push({
                    errorCode: 'AttachmentManagingDirectorDRPKShouldBeAdded'
                });
            }
        }

        if (isPremiumVTBSegment && !productCode.startsWith('IDGP')) {

            if (!attachmentFormSeventyPlusExists) {
                validationErrors.push({
                    errorCode: 'AttachmentFormSeventyPlusShouldBeAdded'
                });
            }

            if (!attachmentManagingDirectorDRPKExists && !skipSeventyPlusDRPKValid) {
                validationErrors.push({
                    errorCode: 'AttachmentManagingDirectorDRPKShouldBeAdded'
                });
            }

            if (!attachmentManagingDirectorUPIPExists) {
                validationErrors.push({
                    errorCode: 'AttachmentManagingDirectorUPIPShouldBeAdded'
                });
            }
        }

        if (isPremiumVTBSegment && productCode.startsWith('IDGP')) {

            if (!lifeInsuranceConstants.productGroupArray.TRIGGER_SKIP_IDGP.includes(productCode) && !attachmentFormSeventyPlusExists) {
                validationErrors.push({
                    errorCode: 'AttachmentFormSeventyPlusShouldBeAdded'
                });
            }
        }

    }

    return validationErrors;

};
