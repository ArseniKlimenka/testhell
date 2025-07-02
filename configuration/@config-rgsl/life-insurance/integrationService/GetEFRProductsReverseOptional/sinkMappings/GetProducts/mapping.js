'use strict';

const { prepareInputForGetEFRProductsReverseOptional } = require('@config-rgsl/life-insurance/lib/efrHelper');

module.exports = function mapping(input, sinkExchange) {

    if (!input.productGroup && !input.productCode && !input.investmentStrategyCode && (!input.risks || input.risks.length == 0) && input.isProductClosed === undefined) {
        throw new Error(`E: Должен быть заполнен хотя бы один атрибут из списка: productGroup, productCode, investmentStrategyCode, risks, isProductClosed`);
    }

    return prepareInputForGetEFRProductsReverseOptional(input, sinkExchange);

};
