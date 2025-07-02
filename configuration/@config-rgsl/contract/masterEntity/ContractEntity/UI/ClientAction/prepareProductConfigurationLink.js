'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function prepareProductConfigurationLink(input) {

    const productConfNumber = input?.data?.economicParameters?.productConfNumber;
    const entity = lifeInsuranceConstants.universalVersionedDocument.Entity.UniversalVersionedDocument;
    const configurationCodeName = productConfNumber?.includes('/') ? lifeInsuranceConstants.universalVersionedDocument.CodeName.ProductConfigurationCorrection : lifeInsuranceConstants.universalVersionedDocument.CodeName.ProductConfiguration;
    const version = "1";

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: entity,
                configurationCodeName: configurationCodeName,
                version: version,
                documentNumber: productConfNumber
            }
        }
    };
};
