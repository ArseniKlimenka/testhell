'use strict';

module.exports = function disableSocialTaxDeduction(input, ambientProperties) {

    const isPolicy = input.context?.Dimensions?.contractType == 'Policy';

    return isPolicy;
};
