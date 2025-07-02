'use strict';

const { productGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function dataSourceInputMapping(input) {

    return {
        data: {
            criteria: {
                productCode: input.productCode,
                selectedRules: input.selectedRules,
                contractNumbers: input.contractNumbers,
                productGroups: [productGroup.NSZ.descriptionRU, productGroup.ISZ.descriptionRU]
            }
        }
    };
};
