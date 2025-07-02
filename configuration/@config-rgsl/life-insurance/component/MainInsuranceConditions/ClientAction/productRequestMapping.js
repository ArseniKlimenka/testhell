'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function productRequestMapping(input, ambientProperties) {

    const partnerBusinessCode = input.componentContext.partner?.partnerBusinessCode;
    if (!partnerBusinessCode) {

        return;
    }

    let productGroup = input.context.Dimensions.productGroup;
    const productGroupCollectivePolicy = input.componentContext.insuranceProduct?.productGroup;
    if (productGroup == lifeInsuranceConstants.productGroupCollective.Name && productGroupCollectivePolicy) {
        productGroup = productGroupCollectivePolicy;
    }

    const request = {
        data: {
            criteria: {
                partnerBusinessCode: partnerBusinessCode,
                productGroup: productGroup
            }
        }
    };

    return request;
};
