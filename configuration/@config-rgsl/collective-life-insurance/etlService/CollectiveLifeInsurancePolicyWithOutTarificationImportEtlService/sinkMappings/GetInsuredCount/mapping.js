'use strict';

module.exports = function mapInput(input) {

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
