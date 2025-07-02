'use strict';

module.exports = function mapping(input) {

    const body = this?.businessContext?.rootData;
    const contractNumber = body?.contract?.number ?? body?.basicAmendmentConditions?.policyData?.policyNumber;
    const validFrom = body?.issueDate ?? body?.basicAmendmentConditions?.validFrom;

    const output = {
        contractNumber,
        validFrom
    };

    return output;

};
