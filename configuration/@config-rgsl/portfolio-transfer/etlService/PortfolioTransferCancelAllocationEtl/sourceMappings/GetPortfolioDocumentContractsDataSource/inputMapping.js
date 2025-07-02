module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                documentNo: input.portfolioTransferNumber,
                stateCodes: ['Created'],
                contractNumber: input.debugData?.contractNumber,
            }
        }
    };
};
