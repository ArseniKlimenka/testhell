'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {
    const bsiIds = sinkExchange.resolveContext('createdBankStatementItems');
    if (!bsiIds) {
        return;
    }
    const rsdNumber = this.businessContext.etlServiceInput.rsdNumber;

    const sat = bsiIds.map(_ => ({
        RSD_NUMBER: rsdNumber,
        CONTRACT_NUMBER: sinkInput.contractNumber,
        FAKE_BSI_ID: _,
    }));

    return {
        'ACC_IMPL.RSD_CONTRACT_BSI_LINK': sat,
    };
};
