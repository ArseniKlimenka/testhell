module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                documentNo: input.portfolioTransferNumber,
                stateCodes: ['AmendmentCreated'],
                contractNumber: input.debugData?.contractNumber,
            }
        }
    };
};
