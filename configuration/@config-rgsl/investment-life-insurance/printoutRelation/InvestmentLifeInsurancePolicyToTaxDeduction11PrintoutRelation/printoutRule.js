'use strict';

const { showServiceMemoPrintout } = require('@config-rgsl/life-insurance/lib/printoutsHelper');

module.exports = function rule(input) {

    return showServiceMemoPrintout(input, this, ['TaxDeduction11']);
};
