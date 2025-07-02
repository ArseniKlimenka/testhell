'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showManualAddress(input, ambientProperties) {

    const { componentContext, rowContext } = input;

    return (rowContext.isManualAddress || rowContext.isForeignAddress) && !rowContext.isSameAsRegistration;

};
