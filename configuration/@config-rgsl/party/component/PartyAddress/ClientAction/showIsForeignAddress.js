'use strict';

module.exports = function showIsForeignAddress(input, ambientProperties) {

    const { componentContext, rowContext } = input;

    return !rowContext.isSameAsRegistration;

};
