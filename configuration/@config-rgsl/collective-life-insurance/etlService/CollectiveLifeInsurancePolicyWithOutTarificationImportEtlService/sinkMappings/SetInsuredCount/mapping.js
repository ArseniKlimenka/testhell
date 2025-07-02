"use strict";

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const paymentPlanUtils = require('@config-rgsl/life-insurance/lib/paymentPlanUtils');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = additionalDataSourcesResults.GetContractFullDataDataSource.data[0].resultData.body;

    body.basicConditions.riskPremium = 0;
    body.technicalInformation.collectivePolicyInsuredCount = sinkExchange.insuredCount;
    body.technicalInformation.collectivePolicyPremiumWasCalculated = false;
    body.technicalInformation.collectivePolicyInsuredLoadedProductCode = body.mainInsuranceConditions.insuranceProduct.productCode;

    setCommission(body, sinkExchange);

    body.risks.forEach(current => {
        const risks = sinkExchange.globalContext.risks.filter(loaded => loaded.riskCode == current.risk.riskCode);
        if (risks.length > 0) {
            current.riskInsuredSum = risks.reduce((sum, elem) => sum += (elem.amount ? Number(elem.amount) : 0), 0);
            current.riskPremium = risks.reduce((sum, elem) => sum += (elem.premium ? Number(elem.premium) : 0), 0);

            body.basicConditions.riskPremium += current.riskPremium;
        }
    });

    const dimensions = {};
    dimensions.configurationName = additionalDataSourcesResults.GetContractFullDataDataSource.data[0].resultData.confName;
    paymentPlanUtils.fillPaymentPlan(body, dimensions);

    body.technicalInformation.collectivePolicyPremiumWasCalculated = true;

    const result = {};
    result.body = body;
    result.number = this.businessContext.etlServiceInput.contractNumber;

    return result;
};

function setCommission(body, context) {

    const commissions = getValue(body, 'commission.policyCommissionItems', []);
    commissions.forEach(commission => {

        if (context.globalContext.commission && commission.calculatedRate) {

            commission.manualRate = Number(context.globalContext.commission);
        }

        if (context.globalContext.manualExpenses) {

            commission.manualExpensesRate = Number(context.globalContext.manualExpenses);
        }

        if (context.globalContext.manualCommissionNP) {

            commission.manualNatuaralPersonRate = Number(context.globalContext.manualCommissionNP);
        }

        if (context.globalContext.manualCommissionSP) {

            commission.manualSolePropriatorRate = Number(context.globalContext.manualCommissionSP);
        }
    });
}
