'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showParentName(input) {

    const partnerCode = getValue(input, 'context.Body.partnerCode');

    return !partnerCode;

};
