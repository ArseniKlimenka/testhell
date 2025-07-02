const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function shouldShowReplaceDisabilityECOF(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');
    const amendmentType = input.context.Dimensions.amendmentType;
    const productCode = input.context.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const checkProduct = [product.ECOFPVTB, product.ECOFVVTB, product.ECOF2ZENIT].includes(productCode);
    const allRisks = input?.rootContext?.Body?.technicalInformation?.allRisks ?? [];
    const risks = allRisks.filter(x => ['DVV36404', 'DAVV36404'].includes(x.risk.riskCode));
    const checkRisk = risks.length != 0;

    return checkProduct && checkRisk && (isBackOffice || amendmentType === changeAmendmentTypes.financialChange);
};
