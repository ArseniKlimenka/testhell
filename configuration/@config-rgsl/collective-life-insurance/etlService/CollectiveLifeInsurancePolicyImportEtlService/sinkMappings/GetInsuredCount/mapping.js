'use strict';

module.exports = function mapInput(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: this.businessContext.etlServiceInput.contractNumber
                }
            }
        }
    };
};
