module.exports = function mapping(input) {

    return {
        portfolioTransferNumber: input.number,
        portfolioTransferIssueDate: input.body.issueDate,
    };
};
