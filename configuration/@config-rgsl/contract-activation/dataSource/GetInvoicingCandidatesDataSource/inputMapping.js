module.exports = function (input) {

    const output = {
        parameters: {
            contractNumbers: input.data.criteria.contractNumbers,
            postingDateTo: input.data.criteria.postingDateTo,
        }
    };

    return output;
};
