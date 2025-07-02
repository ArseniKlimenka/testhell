const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {
    const ret = {
        verificationStatus: translationUtils.getTranslation(`document/LifeInsuranceAttachmentVerification/1`, 'states', null, input.STATE),
        verificationErrors: input.VERIFICATION_ERRORS,
        comments: input.COMMENTS,
        createdDate: input.LOAD_DATE,
        username: input.OPERATIONS_USERNAME,
    };
    return ret;
};
