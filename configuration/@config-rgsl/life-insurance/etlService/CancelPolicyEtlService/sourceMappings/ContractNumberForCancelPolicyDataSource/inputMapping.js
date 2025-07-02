"use strict";

module.exports = function dataSourceInputMapping(input) {

    if (input.contractNumber) {
        return {
            data: {
                criteria: {
                    contractNumber: input.contractNumber
                }
            }
        };
    }

    return {

    };


};
