'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const productCode = sinkExchange.productCode;
    const issueDate = sinkExchange.issueDate;

    const productConfigurationLength = sinkResult?.data?.length;
    let productConfiguration = {};

    if (productConfigurationLength == 1) {

        productConfiguration = sinkResult.data[0].resultData;
        sinkExchange.body.productConfiguration = productConfiguration;
    }

    if (!productConfiguration || productConfigurationLength == 0) {

        throw new Error(`Конфигурация продукта не найдена по коду продукта ${productCode} на дату заключения ${issueDate}`);
    }

    if (productConfigurationLength > 1) {

        throw new Error(`Конфигурации продукта в количестве ${productConfigurationLength} найдено по коду продукта ${productCode} на дату заключения ${issueDate}`);
    }

};
