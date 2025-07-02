'use strict';

const { nonFinChangeTypesForChangeClass } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function showChangeType(input, ambientProperties) {

    const changeClass = input.context.Body.changeClass;

    const showChangeType = checkAvailabilitySome(nonFinChangeTypesForChangeClass, changeClass);

    return showChangeType;

};
