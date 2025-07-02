const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function shouldShowReplaceDisabilityAnyReason(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');
    const amendmentType = input.context.Dimensions.amendmentType;
    const productCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const checkProduct = lifeInsuranceConstants.productGroupArray.PRODUCT_FOR_DISABILITY_ANY_REASON.includes(productCode);
    const allRisks = input.rootContext?.Body?.technicalInformation?.allRisks ?? [];
    const risks = allRisks.filter(x => ['D36404', 'DA36404'].includes(x.risk.riskCode));
    const checkRisk = risks.length != 0;

    return checkProduct && checkRisk && (isBackOffice || amendmentType === changeAmendmentTypes.financialChange);
};
