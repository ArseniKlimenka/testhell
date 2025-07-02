'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function showAdditionalDates(input) {

    const amendmentType = input.context.Dimensions?.amendmentType;
    return amendmentType != amendmentConstants.amendmentType.Cancellation;

};
