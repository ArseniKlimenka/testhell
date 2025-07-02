'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.contractNumber = input.CONTRACT_NUMBER;
    output.universalMasterEntityId = input.UNIVERSAL_MASTER_ENTITY_ID;
    output.universalMasterEntityCode = input.UNIVERSAL_MASTER_ENTITY_CODE;
    output.body = input.BODY ? JSON.parse(input.BODY) : {};
    output.commonBody = input.COMMON_BODY ? JSON.parse(input.COMMON_BODY) : {};
    output.externalData = input.EXTERNAL_DATA ? JSON.parse(input.EXTERNAL_DATA) : {};
    output.publishedArtifactId = input.PUBLISHED_ARTIFACT_ID;
    output.sysCreatedOn = input.SYS_CREATED_ON;
    output.sysCreatedById = input.SYS_CREATED_BY_ID;
    output.sysUpdatedOn = input.SYS_UPDATED_ON;
    output.sysUpdatedById = input.SYS_UPDATED_BY_ID;
    output.sysClientId = input.SYS_CLIENT_ID;
    output.sysVersion = input.SYS_VERSION;
    output.sysSourceSystem = input.SYS_SOURCE_SYSTEM;

    return output;
};
