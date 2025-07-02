'use strict';

const { sportTypes } = require('@config-rgsl/infrastructure/lib/sportConstants');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { mapSportTypes } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

// mapping sport types
module.exports = function mapping(input, dataSourceResponse) {

    const productCode = this.businessContext.rootData.mainInsuranceConditions?.insuranceProduct?.productCode;
    this.businessContext.rootData.basicConditions.sportTypes.availableTypes = productCode === product.ACCIDPC2 ? mapSportTypes(this.businessContext.rootData.basicConditions?.sportTypes?.selectedTypes, productCode) : deepCopy(sportTypes);
};
