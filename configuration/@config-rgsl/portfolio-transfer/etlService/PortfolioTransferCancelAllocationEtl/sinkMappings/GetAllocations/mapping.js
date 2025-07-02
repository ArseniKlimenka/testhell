'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    refDocumentNo: input.contractNumber,
                    paymentPlanDateFrom: this.businessContext.etlServiceInput.portfolioTransferIssueDate,
                }
            }
        }
    };
};
