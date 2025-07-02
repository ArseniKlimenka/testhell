'use strict';

module.exports = function dataSourceInputMapping(input) {

    return {
        data: {
            criteria: {
                documentNo: input.portfolioTransferNumber,
            }
        }
    };

};
