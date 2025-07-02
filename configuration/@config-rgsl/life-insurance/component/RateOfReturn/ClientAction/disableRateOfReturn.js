'use strict';

module.exports = function disableRateOfReturn(input, ambientProperties) {

    const isRatesOfReturn = input.context?.Body?.technicalInformation?.ratesOfReturn?.length > 0;
    const isPolicy = input.context.Dimensions.contractType == "Policy";
    const doAllRatesOfReturnHaveValue = input.context?.Body?.technicalInformation?.ratesOfReturn?.every(x => x.rateOfReturn);
    const isRatesOfReturnVariants = input.context?.Body?.technicalInformation?.ratesOfReturnVariants?.length > 0;
    const selectedVariant = input.context?.Body?.basicInvestmentParameters?.variant?.variantCode;

    return !isRatesOfReturn || isPolicy || !doAllRatesOfReturnHaveValue || isRatesOfReturnVariants && !selectedVariant;
};
