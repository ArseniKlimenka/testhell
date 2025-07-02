module.exports = function DataSourceInputMapping(input) {
    const output = {
        parameters: {
        }
    };

    if (input.data.criteria) {
        output.parameters.aggregatedPaymentNumber = input.data.criteria.aggregatedPaymentNumber;
        output.parameters.bankStatementNo = input.data.criteria.bankStatementNo;
    }

    return output;
};
