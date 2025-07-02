'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { translationUtils } = require('@adinsure/runtime');
const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};
    output.documentNumber = input.AGENT_AGREEMENT_NUMBER;
    output.sequenceNumber = input.SEQ_NUMBER.toString();
    output.manualDocumentNumber = nullCheck(input.MANUAL_DOCUMENT_NUMBER);
    output.documentType = translationUtils.getTranslation(`document/${input.DOCUMENT_TYPE}/1`, 'rootConfiguration', 'Title', input.CODE_NAME);
    output.createdOn = DateTimeUtils.formatDate(input.SYS_CREATED_ON);
    output.createdBy = input.USERNAME;
    output.state = translationUtils.getTranslation(`document/${input.DOCUMENT_TYPE}/1`, 'states', null, input.NEW_STATE);
    output.configurationName = input.DOCUMENT_TYPE;
    output.changesNoteFull = input.CHANGES_NOTE ? input.CHANGES_NOTE : '';
    output.changesNoteShort = input.CHANGES_NOTE ? `${input.CHANGES_NOTE.substring(0, 60).trim()}...` : '';

    return output;
};
