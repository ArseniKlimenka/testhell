'use strict';

const { productCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { isNoteProduct } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function applyData(input, dataSourceResponse) {

    const body = this?.businessContext?.rootData;
    const configurationCodeName = this?.businessContext?.configurationCodeName;
    const isConfInvestmentLifeInsuranceQuote = configurationCodeName == productCode.InvestmentLifeInsuranceQuote;
    const targetDocumentConfigName = this?.businessContext?.targetDocumentConfigName;
    const isTargetDocInvestmentLifeInsurancePolicy = targetDocumentConfigName == productCode.InvestmentLifeInsurancePolicy;
    const currentProductCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (dataSourceResponse.data?.length > 0) {

        const strategyInstrConf = dataSourceResponse.data[0].resultData ?? {};

        body.basicInvestmentParameters.purchaseDate = strategyInstrConf.purchaseDate;
        body.basicInvestmentParameters.dischargeDate = strategyInstrConf.dischargeDate;
        body.basicInvestmentParameters.didBeginDate = strategyInstrConf.didBeginDate;
        body.basicInvestmentParameters.didEndDate = strategyInstrConf.didEndDate;
        body.basicInvestmentParameters.couponPeriods = strategyInstrConf.couponPeriods;
        body.basicInvestmentParameters.windowStartDate = strategyInstrConf.windowStartDate;
        body.basicInvestmentParameters.windowEndDate = strategyInstrConf.windowEndDate;

        if (isConfInvestmentLifeInsuranceQuote && isTargetDocInvestmentLifeInsurancePolicy && isNoteProduct(currentProductCode)) {

            body.basicConditions.issueDate = strategyInstrConf.purchaseDate;
        }
    }
};
