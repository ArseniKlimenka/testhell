'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function agentAgreementFilter(input, ambientProperties) {

    const availablePartners = input.items;

    return availablePartners;
};
