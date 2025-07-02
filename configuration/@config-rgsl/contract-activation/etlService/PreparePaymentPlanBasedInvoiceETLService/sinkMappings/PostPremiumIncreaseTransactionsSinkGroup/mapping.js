module.exports = function mapping(input) {
    const contractNumbers = input.resultData.map(_ => _.contractNumber);

    const chunkSize = 1000;
    const result = [];

    for (let i = 0; i < contractNumbers.length; i += chunkSize) {
        const chunk = contractNumbers.slice(i, i + chunkSize);

        result.push({
            contractNumbers: chunk,
            postingDateTo: this.businessContext.etlServiceInput.postingDateTo,
        });
    }

    return result;
};
