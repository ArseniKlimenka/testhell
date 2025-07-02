'use strict';

module.exports = function disableVariant(input, ambientProperties) {

    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const isRateOfReturnVariantEditor = userRoles.some(x => x.ApplicationRoleCodeName == 'RateOfReturnVariantEditor');

    if (isRateOfReturnVariantEditor) {

        const isRatesOfReturnVariants = input.context?.Body?.technicalInformation?.ratesOfReturnVariants?.length > 0;
        const isPolicy = input.context.Dimensions.contractType == "Policy";

        return !isRatesOfReturnVariants || isPolicy;
    }

    return true;
};
