"use strict";

module.exports = function mapping(input, dataSource) {

    if ((dataSource?.data?.length ?? 0) === 0) {

        return;
    }

    const body = this.businessContext.rootData;

    if (!body.selectedClaimRisks) {

        body.selectedClaimRisks = [];
    }

    body.selectedClaimRisks = dataSource.data.map(item => item.resultData);
};
