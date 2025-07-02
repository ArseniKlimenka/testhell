'use strict';

module.exports = function isPitAmountEnabled(input) {

    const isManualPit = input.rowContext.isManualPit ?? false;
    return isManualPit;
};
