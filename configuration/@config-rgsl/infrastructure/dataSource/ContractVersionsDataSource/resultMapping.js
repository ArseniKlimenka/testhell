'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.contractId = input.contract_id;
    output.contractNumber = input.contract_number;
    output.originalContractNumber = input.original_contract_number;
    output.seqNumber = input.seq_number;
    output.body = JSON.parse(input.body);
    output.commonBody = JSON.parse(input.common_body);
    output.snapshotBody = JSON.parse(input.snapshot_body);
    output.versionState = input.version_state;
    output.stateId = input.state_id;
    output.configurationName = input.code_name;
    output.dimensions = input.dimensions ? JSON.parse(input.dimensions) : [];
    output.createdOn = input.sys_created_on;
    output.contractState = input.contract_state;
    output.documentType = translationUtils.getTranslation(`document/${input.code_name}/1`, 'rootConfiguration', 'Title', input.code_name);
    output.documentState = translationUtils.getTranslation(`document/${input.code_name}/1`, 'states', null, input.contract_state);
    output.documentStateCode = input.contract_state;
    output.productDescription = input.product_description;

    return output;

};
