'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getTranslationByAttachmentType } = require('@config-rgsl/infrastructure/lib/translationHelper');

module.exports = function rule(input) {
    const {
        attachmentType,
        configurationInfo
    } = input;

    const attachmentToTranslate = [
        "ePolicy",
        "ePolicyDigitallySigned",
        "memoCB",
        "memoCBDigitallySigned",
        "contractSigned",
        "KIDAttachment",
        "InvApplicationAttachment",
        "InvApplicationSignedAttachment"
    ];

    if (attachmentToTranslate.includes(attachmentType.code)) {

        const currentLocale = this.applicationContext.locale;
        this.applicationContext.locale = "ru-RU";
        const docMediaType = attachmentType.mediaType ?? 'application/pdf';
        const resultMediaType = lifeInsuranceConstants.mediaType[docMediaType] ?? 'pdf';
        const fileName = getTranslationByAttachmentType(attachmentType.code);

        this.applicationContext.locale = currentLocale;

        return {
            fileName: `${fileName}.${resultMediaType}`
        };
    }

    return {};
};
