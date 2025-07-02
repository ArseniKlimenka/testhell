const { changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * @errorCode {errorCode} OperationsApprovalToActivatedChangeApplicationAttachmentIsRequired
 * @errorCode {errorCode} OperationsApprovalToActivatedInvestmentParametersEditAttachmentIsRequired
 * @errorCode {errorCode} PolicyHolderChangeSelectedButNotPerformed
 * @errorCode {errorCode} InsuredPersonChangeSelectedButNotPerformed
 * @errorCode {errorCode} BeneficiariesChangeSelectedButNotPerformed
 * @errorCode {errorCode} InvestmentParametersChangeSelectedButNotPerformed
 */

/* eslint no-undef: "off"*/

module.exports = function rule(input) {

    const validationErrors = [];

    const body = input.body;
    const amendmentData = body?.amendmentData;

    const actor = this.applicationContext.actor;
    const isSystemActor = actor == lifeInsuranceConstants.actor.System;

    const attachmentsPackage = amendmentData?.amendmentAttachmentsPackage ?? [];
    const selectedChangeTypes = amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.changeTypes ?? [];
    const selectedChangeTypesLength = selectedChangeTypes.length;
    const technicalData = amendmentData?.nonFinChangeAmendmentData?.technicalData;
    const changeTypesHasInvestmentParametersEdit = selectedChangeTypes.includes(changeTypes.investmentParametersEdit);
    const investmentParametersEditApplication = attachmentsPackage.find(item => item.attachmentType === 'investmentParametersEditApplication');
    const changeApplication = attachmentsPackage.find(item => item.attachmentType === 'changeApplication');

    if (!changeApplication && (!changeTypesHasInvestmentParametersEdit || (changeTypesHasInvestmentParametersEdit && selectedChangeTypesLength > 1))) {

        validationErrors.push({
            errorCode: "OperationsApprovalToActivatedChangeApplicationAttachmentIsRequired"
        });
    }

    if (!investmentParametersEditApplication && changeTypesHasInvestmentParametersEdit && technicalData?.areInvestmentParametersChanged && !isSystemActor) {

        validationErrors.push({
            errorCode: "OperationsApprovalToActivatedInvestmentParametersEditAttachmentIsRequired"
        });
    }

    if (selectedChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit) && !technicalData?.isHolderChanged) {

        validationErrors.push({
            errorCode: 'PolicyHolderChangeSelectedButNotPerformed',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/mainAttributes/changeTypes'
        });
    }

    if (selectedChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit) && !technicalData?.isInsuredChanged) {

        validationErrors.push({
            errorCode: 'InsuredPersonChangeSelectedButNotPerformed',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/mainAttributes/changeTypes'
        });
    }

    if ((selectedChangeTypes.includes(changeTypes.beneficiaryEdit) ||
        selectedChangeTypes.includes(changeTypes.beneficiarySelection))
        && !technicalData?.areBeneficiariesChanged) {

        validationErrors.push({
            errorCode: 'BeneficiariesChangeSelectedButNotPerformed',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/mainAttributes/changeTypes'
        });
    }

    if (changeTypesHasInvestmentParametersEdit && !technicalData?.areInvestmentParametersChanged) {

        validationErrors.push({
            errorCode: 'InvestmentParametersChangeSelectedButNotPerformed',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/mainAttributes/changeTypes'
        });
    }

    amendmentUtils.validateChangingInquiries(input, validationErrors);

    return validationErrors;
};
