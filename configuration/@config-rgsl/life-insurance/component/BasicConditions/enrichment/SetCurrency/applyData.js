'use strict';

module.exports = function applyData(input, dataSourceResponse) {

    if (dataSourceResponse && dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const body = this.businessContext.rootData;
        const resultData = dataSourceResponse.data.map(elem => elem.resultData);

        body.basicConditions.currency.currencyDesc = resultData[0].currencyDesc;
        body.basicConditions.currency.currencyNumericCode = resultData[0].currencyNumericCode;

    } else {
        throw new Error(`E: Информация по коду валюты ${input.currency.currencyCode} не найдена.`);
    }

};
