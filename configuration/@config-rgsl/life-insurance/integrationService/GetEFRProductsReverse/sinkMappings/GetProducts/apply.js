'use strict';

const guidHelper = require("@config-rgsl/infrastructure/lib/GuidHelper");
const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const { getArrayOfUniqueObjects } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const nullValue = '';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const res = [];
    const contracts = sinkInput.input.data.criteria.contracts;
    const resultData = sinkResult.data.map(data => data.resultData);

    for (let i = 0; i < contracts.length; i++) {
        const investmentStrategyDescription = contracts[i].investmentStrategyDescription ? contracts[i].investmentStrategyDescription : nullValue;
        const resultFiltered = resultData.filter(item =>
            item.productCode == contracts[i].productCode &&
            item.indexName == investmentStrategyDescription &&
            item.productDescription == contracts[i].productDescription &&
            item.productTypeSap == contracts[i].productGroupDescription
        );
        let responseForCurrentContract = resultFiltered.map((item) => {
            return {
                number: contracts[i].number,
                productDescription: contracts[i].productDescription,
                investmentStrategyDescription: formatUtils.changeEmptyValueToNull(investmentStrategyDescription),
                productCode: contracts[i].productCode,
                productActiveTo: formatUtils.changeEmptyValueToNull(item.productActiveTo),
                productGroupDescription: contracts[i].productGroupDescription,
                efrProductGroupCode: formatUtils.changeEmptyValueToNull(item.productTypeCode),
                efrProductDescription: formatUtils.changeEmptyValueToNull(item.productName),
                efrInvestmentStrategyDescription: formatUtils.changeEmptyValueToNull(item.indexName),
                efrProductCode: formatUtils.changeEmptyValueToNull(item.productCodeSap),
                efrProductGroupDescription: formatUtils.changeEmptyValueToNull(item.productTypeSap)
            };
        });
        responseForCurrentContract = getArrayOfUniqueObjects(responseForCurrentContract);
        res.push(...responseForCurrentContract);
    }

    if (res && res.length > 0) {

        const result = {
            id: guidHelper.generate(),
            data: {
                contracts: res
            }
        };

        sinkExchange.result = result;

    } else {
        throw new Error('E: Подходящих результатов по вашему запросу не найдено.');
    }

};


