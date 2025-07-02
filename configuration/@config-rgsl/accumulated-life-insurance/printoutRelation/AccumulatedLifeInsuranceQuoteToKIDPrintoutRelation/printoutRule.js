'use strict';

const { showKIDPrintout } = require('@config-rgsl/life-insurance/lib/printoutsHelper');

module.exports = function rule(input) {

    return showKIDPrintout(input, this);
};
