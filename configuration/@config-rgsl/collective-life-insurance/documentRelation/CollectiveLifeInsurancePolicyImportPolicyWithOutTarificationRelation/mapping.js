'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(sourceDocument) {
    const targetDocument = {
        contractNumber: this.businessContext.documentNumber,
        productCode: getValue(sourceDocument, 'mainInsuranceConditions.insuranceProduct.productCode'),
        withTarification: getValue(sourceDocument, 'basicConditions.withTarification', false)
    };

    return { body: targetDocument };
};
