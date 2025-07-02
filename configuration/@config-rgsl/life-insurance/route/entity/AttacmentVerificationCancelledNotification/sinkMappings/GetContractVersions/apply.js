'use strict';
const { translationUtils } = require('@adinsure/runtime');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const resultData = sinkResult.data[0].resultData;
    sinkExchange.body = resultData.body;
    sinkExchange.commonBody = resultData.commonBody;
    sinkExchange.contractNumber = resultData.contractNumber;
    sinkExchange.configurationName = resultData.configurationName;
    sinkExchange.productGroupDescription = translationUtils.getTranslation(
        'dataSource/GeneralContractSearchDataSource',
        'enum',
        'productGroup',
        resultData.body.mainInsuranceConditions.insuranceProduct.productGroup,
        'ProductGroup');

};
