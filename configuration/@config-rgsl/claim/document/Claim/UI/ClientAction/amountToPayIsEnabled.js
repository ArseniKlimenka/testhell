'use strict';

module.exports = function amountToPayIsEnabled(input) {

    const isCalcFromAmountToPay = input.data?.isCalcFromAmountToPay;
    return !!isCalcFromAmountToPay;
};
