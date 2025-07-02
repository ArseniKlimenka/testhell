'use strict';

const { businessClock, translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.publishedArtifactCode = input.published_artifact_code;
    output.publishedArtifactName = translationUtils.getTranslation(`document/${input.published_artifact_code}/1`, 'rootConfiguration', 'Title', input.published_artifact_code);
    output.contractId = input.contract_id;
    output.contractNumber = input.contract_number;
    output.processStateCode = input.process_state_code;
    output.processStateName = translationUtils.getTranslation(`document/${input.published_artifact_code}/1`, 'states', null, input.process_state_code);
    output.sysCreatedOn = businessClock.convertFromBusinessTimeToUTC(input.sys_created_on);
    output.sysCreatedBy = input.sys_created_by;
    output.sysUpdatedOn = businessClock.convertFromBusinessTimeToUTC(input.sys_updated_on);
    output.sysUpdatedBy = input.sys_updated_by;
    output.validFrom = businessClock.convertFromBusinessTimeToUTC(input.valid_from);
    output.comment = input.comment;

    return output;

};
