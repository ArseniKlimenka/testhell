'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showRreplacementRisk(input) {

    return getValue(input, 'rowContext.replacementInfo.isReplaceable', false);

};
