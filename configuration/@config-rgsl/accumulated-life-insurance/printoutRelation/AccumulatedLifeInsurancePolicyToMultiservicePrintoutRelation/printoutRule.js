'use strict';

const { showServiceMemoPrintout } = require('@config-rgsl/life-insurance/lib/printoutsHelper');

module.exports = function rule(input) {
    return showServiceMemoPrintout(input, this, ['TAX2', 'LEG15', 'MED98']);
};
