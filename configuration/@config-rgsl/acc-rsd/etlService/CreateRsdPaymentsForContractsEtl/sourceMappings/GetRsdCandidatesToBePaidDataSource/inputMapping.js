module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                rsdNumber: input.rsdNumber,
                contractNumbers: input.contractNumbers,
            }
        }
    };
};
