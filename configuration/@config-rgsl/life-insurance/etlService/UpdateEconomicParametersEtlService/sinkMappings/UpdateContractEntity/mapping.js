'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input, sinkExchange) {

    if (input.isManualCorrection) {
        return;
    }

    const contractEntity = "Contract";
    const originalConfigurationVersion = "1";
    const contractCodeName = input.contractCodeName;
    const contractNumber = input.contractNumber;
    const currentDateTime = DateTimeUtils.dateTimeNow();
    const quote = sinkExchange.quote;

    const contractEntityBody = sinkExchange.contractEntityData?.body ?? {};
    const createdUniversalMasterEntityCode = sinkExchange.globalContext.updatedContractEntities?.filter(i => i.contractNumber == contractNumber)[0]?.universalMasterEntityCode;
    const universalMasterEntityCode = createdUniversalMasterEntityCode ?? input.universalMasterEntityCode;

    contractEntityBody.lastUpdateDate = currentDateTime;

    contractEntityBody.policy = {
        entity: contractEntity,
        number: contractNumber,
        originalConfigurationCodeName: contractCodeName,
        originalConfigurationVersion: originalConfigurationVersion
    };

    contractEntityBody.quote = {
        entity: contractEntity,
        number: quote?.number,
        originalConfigurationCodeName: quote?.originalConfigurationCodeName,
        originalConfigurationVersion: quote?.originalConfigurationVersion
    };

    contractEntityBody.economicParameters = {
        productConfNumber: input.productConfNumber,
        ruleNum: input.ruleNum,
        segment: input.segment,
        isin: input.isin,
        rko: input.rko,
        motivationFromMargin: input.motivationFromMargin,
        motivationFromProductEconomic: input.motivationFromProductEconomic,
        skMargin: input.skMargin,
        fundingRateSwaps: input.fundingRateSwaps,
        laps: input.laps,
        hedge: input.hedge,
        clientID: input.clientID,
        shareRF: input.shareRF,
        shareGF: input.shareGF,
        rvd: input.rvd,
        fundingVersionSubFundID: input.fundingVersionSubFundID,
        memorandumPkDate: input.memorandumPkDate,
        pkNumber: input.pkNumber,
        analyticalAdjustment: input.analyticalAdjustment,
        expectedReturnPercentAK: input.expectedReturnPercentAK,
        insurance: input.insurance,
        riskTransferProduct: input.riskTransferProduct,
        comments: input.comments,
        isManualCorrection: input.isManualCorrection
    };

    return {
        code: universalMasterEntityCode,
        body: contractEntityBody
    };
};
