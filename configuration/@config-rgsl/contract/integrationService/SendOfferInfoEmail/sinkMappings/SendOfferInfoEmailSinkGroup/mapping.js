'use strict';

module.exports = function mapping(sinkResult, sinkExchange) {

    const contractId = sinkExchange.resolveContext('contractId');
    const configurationName = sinkExchange.resolveContext('configurationName');
    const shouldSignAttachment = sinkExchange.resolveContext('shouldSignAttachment');
    const dimensions = sinkExchange.resolveContext('dimensions');
    const policyProductCode = sinkExchange.resolveContext('productCode');
    const policyissueDate = sinkExchange.resolveContext('issueDate');
    const email = sinkExchange.resolveContext('recipientEmail');
    const productGroupDimension = dimensions.find(item => item.Key === 'productGroup');
    const productGroup = productGroupDimension.Value;
    const isOffer = sinkExchange.resolveContext('isOffer');

    if (!isOffer) {

        return;
    }

    return {
        contractId: contractId,
        contractConfName: configurationName,
        policyType: productGroup,
        productCode: policyProductCode,
        issueDate: policyissueDate,
        recipientAddress: email,
        shouldSignAttachment: shouldSignAttachment
    };
};
