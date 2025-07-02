module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        dates: JSON.parse(input.DATES),
    };
};
