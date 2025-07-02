'use strict';

const { translationUtils } = require('@adinsure/runtime');

function getTranslationByAttachmentType(attachmentType) {

    return translationUtils.getTranslation('masterEntity/AttachmentType/1', 'localized-field', 'description', attachmentType);
}

function getTranslationByPrintoutRelationType(documentConf, printoutRelationType) {

    return translationUtils.getTranslation(`printoutRelation/${printoutRelationType}/1`, 'printoutRelations', documentConf);
}

module.exports = {
    getTranslationByAttachmentType,
    getTranslationByPrintoutRelationType
};
