const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input) {
    const contractNumbers = input.resultData.map(_ => _.contractNumber);

    return {
        contractNumbers,
        postingDescription: 'Full IC revaluation',
    };
};
