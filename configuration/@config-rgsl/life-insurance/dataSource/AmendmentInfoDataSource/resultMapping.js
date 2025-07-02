module.exports = function resultMapping(input) {

    const output = {};

    output.contractNumber = input.CONTRACT_NUMBER;
    output.amendmentNumber = input.AMENDMENT_NUMBER;
    output.amendmentType = input.AMENDMENT_TYPE;
    output.amendmentReason = input.AMENDMENT_REASON;
    output.state = input.STATE;
    output.issueDate = input.ISSUE_DATE;
    output.validFrom = input.VALID_FROM;

    return output;
};
