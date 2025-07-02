'use strict';

const { getInsuranceProductFilter } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = function insuranceProductFilter(input, ambientProperties) {

    const currentPartner = input.context.partner?.partnerCode;

    if (!currentPartner) {
        return [];
    }

    const result = input.items
        .filter(_ => _.isProductLinkedToAsset)
        .map(i => (
            {
                productCode: i.productCode,
                productDescription: i.productDescription,
                productGroup: i.productGroup,
                salesSegment: i.salesSegment
            }
        ));

    return result;

};
