"use strict";

module.exports = function dataSourceInputMapping(input) {

    return {
        data: {
            criteria: {
                quoteNumber: input.contractNumber,
                isCollectivePolicy: true,
                state: 'Draft'
            }
        }
    };
};
