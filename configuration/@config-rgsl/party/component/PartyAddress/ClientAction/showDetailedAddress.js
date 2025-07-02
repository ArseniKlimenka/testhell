'use strict';

module.exports = function showDetailedAddress(input, ambientProperties) {

    const { componentContext, rowContext } = input;

    return !rowContext.isManualAddress && !rowContext.isForeignAddress && !rowContext.isSameAsRegistration;

};
