'use strict';

const { businessClock, translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {
    const output = {};
    output.related = {
        entityType: input.ENTITY_TYPE,
        codeName: input.CODE_NAME,
        documentNumber: input.DOCUMENT_NUMBER,
        createdOn: businessClock.convertFromBusinessTimeToUTC(input.CREATED_ON),
        documentState: translationUtils.getTranslation(`document/${input.CODE_NAME}/1`, 'states', null, input.DOCUMENT_STATE),
        configurationVersion: input.PUBLISHED_VERSION,
        translatedCodeName: translationUtils.getTranslation(`document/${input.CODE_NAME}/1`, 'rootConfiguration', 'Title', input.CODE_NAME),
    };

    return output;
};
