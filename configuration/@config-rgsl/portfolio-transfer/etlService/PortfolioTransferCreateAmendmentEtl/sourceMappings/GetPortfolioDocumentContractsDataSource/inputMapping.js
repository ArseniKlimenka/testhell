module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                documentNo: input.portfolioTransferNumber,
                stateCodes: ['AllocationCancelled'],
                contractNumber: input.debugData?.contractNumber,
            }
        }
    };
};
