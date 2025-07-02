'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { LocalDate } = require('@js-joda/core');

module.exports = function getnext(input) {

    // if number is already exists then do nothing
    if (input.number) {
        return {
            "number": input.number
        };
    }

    const stateCode = input?.metadata?.state?.Code;
    const configurationCodeName = input?.metadata?.configuration?.codeName;
    const universalVersionedDocumentType = input?.metadata?.configuration?.dimensions?.universalVersionedDocumentType;
    const originalNumber = input?.metadata?.originalNumber;
    const sequenceNumber = input?.sequenceNumber;
    const isProductConfiguration = configurationCodeName == lifeInsuranceConstants.universalVersionedDocument.CodeName.ProductConfiguration;
    const isProductConfigurationCorrection = configurationCodeName == lifeInsuranceConstants.universalVersionedDocument.CodeName.ProductConfigurationCorrection;

    // Product configuration
    if (isProductConfiguration) {
        const sequenceName = "BFX.UNIVERSAL_VERSIONED_DOCUMENT_PC";
        const template = "КП-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }

    // Default corrections numbering
    if (isProductConfigurationCorrection) {

        return {
            "number": originalNumber + "/" + sequenceNumber
        };
    }

    if (configurationCodeName == lifeInsuranceConstants.assetConfigurationName) {

        const thisYear = LocalDate.now().year().toString();
        const sequenceName = "PAS_IMPL.ASSET";
        const template = `АКТИВ-${thisYear}%07d`;

        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }

    if (configurationCodeName == lifeInsuranceConstants.assetChangeAmendmentConfigurationName) {

        return {
            "number": originalNumber + "/" + sequenceNumber
        };
    }

    // Default numbering
    return {
        "sequenceName": "BFX.UNIVERSAL_VERSIONED_DOCUMENT",
        "template": "%d"
    };

};
