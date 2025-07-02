'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const ptDatas = additionalDataSourcesResults.PortfolioTransferSearchRgslDataSource.data;
    if (ptDatas?.length !== 1) {
        throw 'Portfolio data was not found: ' + ptDatas?.length;
    }

    const ptData = ptDatas[0].resultData;
    const debugData = this.businessContext.etlServiceInput.debugData;

    return {
        contractNumber: input.contractNumber,
        issueDate: ptData.issueDate,
        agentAgreementNumber: ptData.aaNumberTo,
        partnerCode: ptData.serviceProviderCodeTo,
        sadNumber: ptData.sadNumberTo,
        debugData: debugData,
    };
};
