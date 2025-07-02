'use strict';
const { additionalInitiatorType } = require('@config-rgsl/life-insurance/lib/additionalInitiatorsHelper');

module.exports = function disableShare(input) {

    return input.rowContext?.agentType === additionalInitiatorType.Mage;
};
