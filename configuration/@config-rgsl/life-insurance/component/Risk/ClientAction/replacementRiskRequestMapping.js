'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function replacementRiskRequestMapping(input) {

    const productCode = getValue(input, 'rootContext.Body.mainInsuranceConditions.insuranceProduct.productCode');
    const isReplaceable = getValue(input, 'data.replacementInfo.isReplaceable');
    const parentRisk = isReplaceable && getValue(input, 'data.replacementInfo.parentRiskCode') || '_';

    if (productCode) {
        return {
            data: {
                criteria: {
                    productCode,
                    parentRisk
                }
            }
        };
    }
};
