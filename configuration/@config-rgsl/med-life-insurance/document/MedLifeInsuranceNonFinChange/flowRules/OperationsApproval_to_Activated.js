const { changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

/**
 * @errorCode {errorCode} OperationsApprovalToActivatedChangeApplicationAttachmentIsRequired
 * @errorCode {errorCode} PolicyHolderChangeSelectedButNotPerformed
 * @errorCode {errorCode} InsuredPersonChangeSelectedButNotPerformed
 * @errorCode {errorCode} BeneficiariesChangeSelectedButNotPerformed
 */

/* eslint no-undef: "off"*/

module.exports = async function rule(input) {

    const validationErrors = [];

    const body = input.body;

    const attachmentsPackage = body.amendmentData.amendmentAttachmentsPackage ?? [];

    const changeApplication = attachmentsPackage.find(item => item.attachmentType === 'changeApplication');

    if (!changeApplication) {

        validationErrors.push({
            errorCode: "OperationsApprovalToActivatedChangeApplicationAttachmentIsRequired"
        });
    }

    const nonFinChangeAmendmentData = body.amendmentData?.nonFinChangeAmendmentData;
    const selectedChangeTypes = nonFinChangeAmendmentData?.mainAttributes.changeTypes ?? [];
    const technicalData = nonFinChangeAmendmentData?.technicalData;

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

    amendmentUtils.validateChangingInquiries(input, validationErrors);

    return validationErrors;
};
