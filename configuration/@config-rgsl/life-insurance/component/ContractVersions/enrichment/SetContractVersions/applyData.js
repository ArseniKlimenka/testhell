module.exports = function applyData(input, dataSourceResponse) {

    const body = this.businessContext.rootData;

    body.contractVersions = (dataSourceResponse?.data ?? []).map(_ => ({
        contractId: _.resultData.contractId,
        contractNumber: _.resultData.contractNumber,
        seqNumber: _.resultData.seqNumber,
        body: _.resultData.body,
        commonBody: _.resultData.commonBody,
        snapshotBody: _.resultData.snapshotBody,
        versionState: _.resultData.versionState,
        stateId: _.resultData.stateId,
        configurationName: _.resultData.configurationName,
        dimensions: _.resultData.dimensions,
        createdOn: _.resultData.createdOn,
        contractState: _.resultData.contractState,
        documentType: _.resultData.documentType,
        documentState: _.resultData.documentState,
        productDescription: _.resultData.productDescription,
    }));
};
