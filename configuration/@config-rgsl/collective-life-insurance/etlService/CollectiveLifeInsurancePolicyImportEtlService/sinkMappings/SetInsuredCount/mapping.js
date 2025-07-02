"use strict";

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = additionalDataSourcesResults.GetContractFullDataDataSource.data[0].resultData.body;

    body.technicalInformation.collectivePolicyInsuredCount = sinkExchange.insuredCount;
    body.technicalInformation.collectivePolicyPremiumWasCalculated = false;
    body.technicalInformation.collectivePolicyInsuredLoadedProductCode = body.mainInsuranceConditions.insuranceProduct.productCode;

    body.risks.forEach(x => {
        x.riskInsuredSum = undefined;
        x.riskPremium = undefined;
    });

    const result = {};
    result.body = body;
    result.number = this.businessContext.etlServiceInput.contractNumber;

    return result;
};
