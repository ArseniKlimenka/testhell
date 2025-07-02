const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function mapping(policyBody, commonBody) {

    const validFrom = policyBody.amendmentData?.basicAmendmentConditions?.validFrom;
    const amendmentDate = policyBody.amendmentData?.technicalAmendmentData?.amendmentDate;

    if (!validFrom && !amendmentDate) {

        throw 'Unable to set amendment date';
    }

    const amendmentBody = {
        basicAmendmentConditions: {
            amendmentReason: "reactivation",
            validFrom: validFrom ?? amendmentDate
        },
        technicalInformation: amendmentUtils.getTechnicalInformation(this)
    };

    return { body: amendmentBody };
};
