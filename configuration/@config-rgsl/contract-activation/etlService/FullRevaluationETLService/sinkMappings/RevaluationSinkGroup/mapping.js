module.exports = function mapping(input) {
    const contractNumbers = input.resultData.map(_ => _.contractNumber);
    const newRevaluationDate = this.businessContext.etlServiceInput.newRevaluationDate;

    return {
        contractNumbers,
        newRevaluationDate,
        postingDescription: 'Full premium revaluation',
    };
};
