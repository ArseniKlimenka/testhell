'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const data = getValue(sinkResult, 'data');

    if (!data || data.length !== 1) {

        return;
    }

    const contractId = data[0].resultData.contractId;
    const configurationName = data[0].resultData.configurationName;
    const dimensions = data[0].resultData.dimensions;
    const productCode = data[0].resultData.body.mainInsuranceConditions.insuranceProduct.productCode;
    const issueDate = data[0].resultData.body.basicConditions.issueDate;
    const email = data[0].resultData.body.issueForm.email;

    const issueFormCode = getValue(data[0].resultData.body, 'issueForm.code.issueFormCode', '');
    const isOffer = issueFormCode == 'offer';

    sinkExchange.mapContext('contractId', contractId);
    sinkExchange.mapContext('configurationName', configurationName);
    sinkExchange.mapContext('dimensions', dimensions);
    sinkExchange.mapContext('productCode', productCode);
    sinkExchange.mapContext('issueDate', issueDate);
    sinkExchange.mapContext('recipientEmail', email);
    sinkExchange.mapContext('isOffer', isOffer);
};
