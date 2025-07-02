'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function guaranteedIncomeFilter(input, ambientProperties) {

    const guaranteedIncomes = input.items;

    const uniqueProductConfGuaranteedIncomes = input.rootContext.ClientViewModel?.uniqueProductConfGuaranteedIncomes ?? [];

    const availableGuaranteedIncomes = guaranteedIncomes.filter(i => uniqueProductConfGuaranteedIncomes.includes(i.guaranteedIncomeCode));

    return availableGuaranteedIncomes;
};
