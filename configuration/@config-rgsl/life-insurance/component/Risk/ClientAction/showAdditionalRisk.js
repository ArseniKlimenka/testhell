'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showAdditionalRisk(input) {

    return getValue(input, 'rowContext.isAdditional', false);

};
