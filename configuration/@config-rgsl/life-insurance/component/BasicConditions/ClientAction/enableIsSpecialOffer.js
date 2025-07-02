'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { productGroupArray, contractType } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function enableIsSpecialOffer(input) {

    const body = input.context.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const constractContractType = input.rootContext.Dimensions.contractType;

    return !this.view.areAllElementsDisabled() &&
        isSaveOperationAvailable(this.view) &&
        constractContractType === contractType.Quote &&
        productGroupArray.PRODUCTS_WITH_SPECIAL_OFFER.includes(productCode);
};
