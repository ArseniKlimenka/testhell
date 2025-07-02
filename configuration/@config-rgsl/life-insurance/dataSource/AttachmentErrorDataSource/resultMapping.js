module.exports = function resultMapping(input) {
    const output = {};

    output.attachmentErrorCode = input.CODE;
    output.attachmentErrorDescriptionFull = input.DESCRIPTION_FULL;
    output.attachmentErrorDescriptionShort = input.DESCRIPTION_SHORT;
    output.attachmentErrorTypeOfError = input.TYPE_OF_ERROR;
    output.attachmentErrorClassOfError = input.CLASS_OF_ERROR;

    return output;
};
