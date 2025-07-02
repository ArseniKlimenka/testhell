module.exports = function mapSinkToDataSource(input) {
    input.contractNumbers = input.contractNumbers || [];

    // For backward compatibility we support also contractNumber in criteria
    if (input.contractNumber) {
        input.contractNumbers.push(input.contractNumber);
    }

    return {
        data: {
            criteria: {
                contractNumbers: input.contractNumbers,
                postingDateTo: input.postingDateTo,
            }
        }
    };
};
