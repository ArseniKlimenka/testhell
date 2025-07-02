'use strict';

module.exports = function mapping(input, sinkExchange) {

    const body = input.body;
    const productCode = input.body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body?.basicConditions?.issueDate;

    sinkExchange.body = body;
    sinkExchange.productCode = productCode;
    sinkExchange.issueDate = issueDate;
    sinkExchange.originalDocumentNumber = input.originalDocumentNumber;
    sinkExchange.documentNumber = input.documentNumber;
    sinkExchange.configurationCodeName = input.configurationCodeName;
    sinkExchange.configurationVersion = input.configurationVersion;
    sinkExchange.contractType = input.contractType;

    return {
        input: {
            data: {
                criteria: {
                    maxVersion: true,
                    productCode,
                    issueDate
                }
            }
        }
    };
};
