'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const body = sinkExchange.resolveContext('body');
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions?.issueDate;

    const productConfigurationLength = sinkResult?.data?.length;

    if (productConfigurationLength == 0) {

        throw new Error(`Конфигурация продукта не найдена по коду продукта ${productCode} на дату заключения ${issueDate}`);
    }

    if (productConfigurationLength > 1) {

        throw new Error(`Конфигурации продукта в количестве ${productConfigurationLength} найдено по коду продукта ${productCode} на дату заключения ${issueDate}`);
    }

    body.productConfiguration = sinkResult.data[0].resultData;
    sinkExchange.mapContext('body', body);
};
