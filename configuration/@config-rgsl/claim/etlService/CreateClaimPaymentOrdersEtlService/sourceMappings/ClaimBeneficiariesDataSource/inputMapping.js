"use strict";

module.exports = function dataSourceInputMapping(input) {

    return {
        data: {
            criteria: {
                documentNumber: input.claimNumber
            }
        }
    };
};
