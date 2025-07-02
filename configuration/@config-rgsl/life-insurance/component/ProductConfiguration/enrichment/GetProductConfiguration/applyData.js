'use strict';

module.exports = function mapping(input, dataSourceResponse) {

    const body = input.context?.Body || this.businessContext?.rootData;
    const issueDate = body?.basicConditions?.issueDate;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    const productConfigurationLength = dataSourceResponse?.data?.length;
    let productConfiguration = {};

    if (productConfigurationLength == 1) {

        productConfiguration = dataSourceResponse.data[0].resultData;
    }

    if (input.context?.Body && (!productConfiguration || productConfigurationLength == 0)) {

        throw new Error(`Конфигурация продукта не найдена по коду продукта ${productCode} на дату заключения ${issueDate}`);
    }

    if (productConfigurationLength > 1) {

        throw new Error(`Конфигурации продукта в количестве ${productConfigurationLength} найдено по коду продукта ${productCode} на дату заключения ${issueDate}`);
    }

    body.productConfiguration = productConfiguration;

};
