"use strict";

module.exports = function dataSourceInputMapping(input) {

    return {
        data: {
            criteria: {
                contractNumber: input.contractNumber
            }
        }
    };
};
