'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showIsSameAsRegistration(input, ambientProperties) {

    const { componentContext, rowContext } = input;

    const addressTypeCode = getValue(rowContext, 'addressType.addressTypeCode');

    return ['F', 'P'].includes(addressTypeCode);

};
