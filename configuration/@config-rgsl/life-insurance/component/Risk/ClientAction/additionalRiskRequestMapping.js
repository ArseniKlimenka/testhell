'use strict';

const lifeConstant = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function additionalRiskRequestMapping(input) {

    const productCode = input.rootContext.Body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const relationType = lifeConstant.relationType.additional;
    const searchCriteria = {};

    if (productCode) {

        searchCriteria.productCode = productCode;
        searchCriteria.relationType = relationType;
    }

    if (input.searchText) {

        searchCriteria.searchText = input.searchText;
    }

    return {
        data: {
            criteria: searchCriteria
        },
        paging: {
            pageSize: 30,
            page: 0
        }
    };
};
