'use strict';

const { showServiceMemoPrintout } = require('@config-rgsl/life-insurance/lib/printoutsHelper');
const { giftServices } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    return showServiceMemoPrintout(input, this, [giftServices.MED96]);
};
