const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { contractType, productGroup, productsWorthyCentury } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function canManualCorrection(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const hasStartDateManualCorrectionRole = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'StartDateManualCorrection');

    const isQuote = input.context.Dimensions.contractType == contractType.Quote;

    const productConfiguration = input.additionalContext?.productConfiguration;
    if (!productConfiguration) {
        return false;
    }
    const productGroupCode = productConfiguration?.productGroupCode;
    const isAccident = productGroupCode == productGroup.NS.descriptionRU;

    const productCode = productConfiguration?.productCode;

    const isWorthyCentury = productsWorthyCentury.includes(productCode);

    return isSaveOperationAvailable(this.view) && hasStartDateManualCorrectionRole && isQuote && !isAccident && !isWorthyCentury;
};
