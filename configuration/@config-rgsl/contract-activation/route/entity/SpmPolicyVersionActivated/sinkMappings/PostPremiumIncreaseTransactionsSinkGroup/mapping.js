module.exports = function mapping(input) {
    const body = input.body;

    if (body.basicConditions.invoiceOnActivation) {
        return {
            contractNumbers: [input.number],
            postingDescription: 'Policy version activation',
        };
    }
};
