'use strict';

const { getBusinessRulesFunction } = require("@config-rgsl/life-insurance/lib/businessRulesHelper");
const underwriterCoeffConfigurationLink = require("@config-rgsl/life-insurance/lib/underwriterCoeffConfiguration");
const underwriterCoeffConfiguration = getBusinessRulesFunction(underwriterCoeffConfigurationLink);
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function risksCheckIfRowActionIsAllowed(input, ambientProperties) {

    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;
    const stateCode = input.context?.State?.Code;
    const productGroup = input.context?.Dimensions?.productGroup;
    const isReplaceable = input.affectedRow?.replacementInfo?.isReplaceable ?? false;
    const isAdditional = input.affectedRow?.isAdditional ?? false;
    const riskInsuredSumByPeriodLength = (input?.affectedRow?.riskInsuredSumByPeriod ?? []).length;
    const manualCorrection = input.context.Body.risksCorrection?.manualCorrection ?? false;
    const correctionWithoutCalc = input?.context?.Body?.risksCorrection?.correctionWithoutCalc;
    const manualRiskDeletion = input.context.Body.risksCorrection?.manualRiskDeletion ?? false;
    const productCode = input.context.Body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const mainRiskCode = input.context.ClientViewModel.mainRiskCode;
    const currentRiskCode = input.affectedRow?.risk.riskCode;
    const isCurrentRiskMain = mainRiskCode && currentRiskCode && mainRiskCode == currentRiskCode;
    const amendmentType = input.context.Dimensions.amendmentType;
    const amendmentData = input.context.Body.amendmentData?.finChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];
    const selectedPackages = input.context.Body.risksPackages?.selectedPackages ?? [];
    const deletionOption = lifeInsuranceConstants.productGroupArray.SHOW_UW_BUTTON.includes(productCode);
    const isMigrated = input.context.Body.migrationAttributes?.isMigrated ?? false;

    const isAllowedToChangeByAmendment = amendmentType === changeAmendmentTypes.financialChange &&
        (stateCode === lifeInsuranceConstants.policyState.Draft || stateCode === lifeInsuranceConstants.policyState.OperationsApproval) &&
        (manualCorrection || isMigrated);
    const isAlowedToRemoveByAmendment = selectedChangeTypes.includes(changeTypes.riskEdit);
    const isAlowedToEditByAmendment = selectedChangeTypes.includes(changeTypes.riskEdit) ||
        selectedChangeTypes.includes(changeTypes.insuredSumAndPaymentEdit) ||
        isMigrated;

    const isShowUWCoefficients = showUWCoefficients(productCode, currentRiskCode);

    const canBeCorrectedUWCoefficients = (stateCode == lifeInsuranceConstants.policyState.OnReview && currentWorkUnitActor == 'Underwriter' && isShowUWCoefficients);
    const canBeCorrectedByUnderwriter = (stateCode == lifeInsuranceConstants.policyState.OnReview && currentWorkUnitActor == 'Underwriter' && manualCorrection);
    const riskReplaceECOF = (lifeInsuranceConstants.productsCOF.includes(productCode) && ['CDHR10800', 'CDP36404'].includes(currentRiskCode));
    const canBeReplacedBySeller = (['risk', 'endowment'].includes(productGroup) && isReplaceable) || riskReplaceECOF;
    const canBeReplacedByUnderwriter = (['investment', 'endowment', 'risk'].includes(productGroup) && isReplaceable && stateCode === lifeInsuranceConstants.policyState.OnReview && currentWorkUnitActor == 'Underwriter');

    const risks = ['DVV36404', 'DAVV36404'];
    const ecofRisks = ['DVV36404', 'DAVV36404', 'DNS36404', 'DTP36404', 'CTDA36404', 'DASS36404', 'CDHR10800', 'CDP36404'];
    const termLifeRisks = ['I42204', 'DNS42204', 'DTP42204', 'D42204'];
    const ecatfRisks = ['D36404', 'DA36404'];
    const canBeDeleted =
        stateCode === lifeInsuranceConstants.policyState.OnReview &&
        currentWorkUnitActor == 'Underwriter' &&
        (selectedPackages.filter(x => x.packageCode == currentRiskCode).length == 0) &&
        ((manualRiskDeletion && [lifeInsuranceConstants.product.ERCP2, lifeInsuranceConstants.product.CAPCLRELOAS, lifeInsuranceConstants.product.CAPCLCHILDOAS].includes(productCode)) ||
            ([lifeInsuranceConstants.product.EFRBFKO].includes(productCode) && risks.includes(currentRiskCode)) ||
            (manualRiskDeletion && [lifeInsuranceConstants.product.ECOFVVTB, lifeInsuranceConstants.product.ECOFPVTB, lifeInsuranceConstants.product.ECOF2ZENIT].includes(productCode) && ecofRisks.includes(currentRiskCode)) ||
            (productCode == lifeInsuranceConstants.product.TERMVVTB && termLifeRisks.includes(currentRiskCode) && manualCorrection) ||
            ([lifeInsuranceConstants.product.ECATFPVTB, lifeInsuranceConstants.product.ECATFVVTB, lifeInsuranceConstants.product.ECATFZENIT, lifeInsuranceConstants.product.ECATFUBRR].includes(productCode) && ecatfRisks.includes(currentRiskCode)));

    const isDeleteAvailable = !deletionOption ? (isAdditional || canBeCorrectedByUnderwriter || canBeDeleted || (isAllowedToChangeByAmendment && isAlowedToRemoveByAmendment)) &&
        !isCurrentRiskMain :
        canBeDeleted;
    const isEditAvailable = !deletionOption ? (canBeReplacedBySeller ||
        canBeReplacedByUnderwriter ||
        canBeCorrectedByUnderwriter ||
        canBeCorrectedUWCoefficients ||
        (isAllowedToChangeByAmendment && isAlowedToEditByAmendment)) :
        manualCorrection || correctionWithoutCalc;
    const isDetailsAvailable = riskInsuredSumByPeriodLength > 0;

    return {
        delete: isDeleteAvailable,
        edit: isEditAvailable,
        details: isDetailsAvailable
    };

};

function showUWCoefficients(productCode, riskCode) {
    const uwCoeffConfiguration = underwriterCoeffConfiguration({ productCode, riskCode });

    if (!uwCoeffConfiguration) { return false; }

    return uwCoeffConfiguration.showUnderwriterPremium || uwCoeffConfiguration.showUnderwriterRatio || uwCoeffConfiguration.showUnderwriterPremiumWithoutTariffication || uwCoeffConfiguration.showUnderwriterRatioWithoutTariffication;
}
