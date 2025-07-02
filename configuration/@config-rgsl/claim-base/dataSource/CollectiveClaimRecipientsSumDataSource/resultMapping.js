'use strict';

module.exports = function resultMapping(input) {

    const totalAmont = input[0]?.TOTAL_AMOUNT ?? 0;

    return {
        totalAmount: totalAmont
    };
};
