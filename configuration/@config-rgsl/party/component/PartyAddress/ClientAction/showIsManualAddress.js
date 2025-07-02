'use strict';

module.exports = function showIsManualAddress(input, ambientProperties) {

    const { componentContext, rowContext } = input;

    return !rowContext.isSameAsRegistration;

};
