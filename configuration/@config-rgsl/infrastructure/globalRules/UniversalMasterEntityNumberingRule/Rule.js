'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function getnext(input) {

    // if number is already exists then do nothing
    if (input.number) {
        return {
            "number": input.number
        };
    }

    const stateCode = input?.metadata?.state?.Code;
    const configurationCodeName = input?.metadata?.configuration?.codeName;
    const originalNumber = input?.metadata?.originalNumber;
    const isContractEntity = configurationCodeName == lifeInsuranceConstants.universalMasterEntity.CodeName.ContractEntity;

    // Contract entity
    if (isContractEntity) {
        const sequenceName = "BFX.UNIVERSAL_MASTER_ENTITY_APD";
        const template = "ДПД-" + "%010d";
        return {
            "sequenceName": sequenceName,
            "template": template
        };
    }

    // Default numbering
    return {
        "sequenceName": "BFX.UNIVERSAL_MASTER_ENTITY",
        "template": "%d"
    };

};
