'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { documentConfiguration } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function mapInput(input) {

    const universalDocumentNumber = getValue(this, 'businessContext.documentNumber');
    const entityType = getValue(this, 'businessContext.entityType');

    if (entityType != documentConfiguration.UniversalDocument || !universalDocumentNumber) { return; }

    return {
        data: {
            criteria: {
                universalDocumentNumber
            }
        }
    };
};
