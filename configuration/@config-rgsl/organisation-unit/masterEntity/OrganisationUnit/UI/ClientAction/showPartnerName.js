'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showPartnerName(input) {

    const parentCode = getValue(input, 'context.Body.parentCode');

    return !parentCode;

};
