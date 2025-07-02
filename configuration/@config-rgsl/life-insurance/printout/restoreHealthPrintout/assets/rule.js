'use strict';

const { partnerCode, product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function appendixRule(input) {

    const appendix = [];

    const productCode = input.body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const OASpartner = input.body?.mainInsuranceConditions?.partner?.partnerBusinessCode == partnerCode.OAS;

    if (OASpartner) {
        if (productCode == product.RHELIGHTOAS) {
            appendix.push({
                name: `MedLifePrintoutAssets/rehabMemoLight.pdf`,
                mode: 'Prepend'
            });
        }

        if (productCode == product.RHEBASEOAS || productCode == product.RHEOPTIMAOAS) {
            appendix.push({
                name: `MedLifePrintoutAssets/rehabMemoBaseOptima.pdf`,
                mode: 'Prepend'
            });
        }
    }

    return appendix;

};
