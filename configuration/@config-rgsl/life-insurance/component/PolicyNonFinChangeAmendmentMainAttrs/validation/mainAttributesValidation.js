'use strict';

const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} ChangeTypeIsRequired
 * @errorCode {errorCode} insuredPersonPesonalDataChangeTypeIsRequired
 * @errorCode {errorCode} policyHolderPesonalDataChangeTypeIsRequired
 * @errorCode {errorCode} FinancialAttributesChanged
 * @errorCode {errorCode} AmendmentEffectiveDateIsRequired
 * @errorCode {errorCode} BeneficiaryEditChangeTypeIsNotAllowedWhenHeritorsAreAvailable
 * @errorCode {errorCode} changeReasonIsRequired
 * @errorCode {errorCode} personalDataChangeTypeIsRequired
 */

module.exports = function rootLevelValidation(input) {

    const amendmentType = this.businessContext.configurationDimensions['amendmentType'];
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;
    const isPolicyHolder = getValue(body, 'insuredPerson.isPolicyHolder');

    const validationErrors = [];

    if (!input.changeTypes || input.changeTypes.length === 0) {

        validationErrors.push({
            errorCode: 'ChangeTypeIsRequired',
            errorDataPath: dataPath + '/changeTypes'
        });
    }
    else if (input.changeTypes.includes(changeTypes.policyHolderPersonalDataEdit) && isPolicyHolder && !input.changeTypes.includes(changeTypes.insuredPersonPersonalDataEdit)) {

        validationErrors.push({
            errorCode: 'insuredPersonPesonalDataChangeTypeIsRequired',
            errorDataPath: dataPath + '/changeTypes'
        });
    }
    else if (input.changeTypes.includes(changeTypes.insuredPersonPersonalDataEdit) && isPolicyHolder && !input.changeTypes.includes(changeTypes.policyHolderPersonalDataEdit)) {

        validationErrors.push({
            errorCode: 'policyHolderPesonalDataChangeTypeIsRequired',
            errorDataPath: dataPath + '/changeTypes'
        });
    }
    else if ((input.changeTypes.includes(changeTypes.insuredPersonPersonalDataEdit) ||
             input.changeTypes.includes(changeTypes.policyHolderPersonalDataEdit) ||
             input.changeTypes.includes(changeTypes.beneficiaryEdit)) &&
             !input.personalDataChangeType) {

        validationErrors.push({
            errorCode: 'personalDataChangeTypeIsRequired',
            errorDataPath: dataPath + '/personalDataChangeType'
        });
    }

    const isHeritors = getValue(body, 'beneficiaries.isHeritors');

    if (input.changeTypes && input.changeTypes.includes(changeTypes.beneficiaryEdit) && isHeritors) {

        validationErrors.push({
            errorCode: 'BeneficiaryEditChangeTypeIsNotAllowedWhenHeritorsAreAvailable',
            errorDataPath: dataPath + '/changeTypes'
        });
    }

    const areFinancialAttributesAffected = body.amendmentData.nonFinChangeAmendmentData?.technicalData?.areFinancialAttributesAffected;

    if (areFinancialAttributesAffected) {

        validationErrors.push({
            errorCode: 'FinancialAttributesChanged',
            severity: 'Warning'
        });
    }

    if (!input.initiator) {

        validationErrors.push({
            errorCode: 'initiatorIsRequired',
            errorDataPath: dataPath + '/initiator'
        });
    }
    else if (input.initiator === 'insurer' && !input.changeReason) {

        validationErrors.push({
            errorCode: 'changeReasonIsRequired',
            errorDataPath: dataPath + '/changeReason'
        });
    }

    return validationErrors;
};
