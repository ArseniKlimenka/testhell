const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(input, sinkExchange) {

    const type = input.body.paymentOrderInformation.paymentOrderType;

    if (type === paymentOrderType.Claim) {

        const claim = sinkExchange.resolveContext('claimBody') ?? sinkExchange.resolveContext('endowmentBody');
        const mainRisks = sinkExchange.resolveContext('mainRisks');
        const mainRisk = mainRisks.find(r => r.contractNumber == input.body.paymentOrderInformation.contractNumber);

        return {
            input: {
                data: {
                    criteria: {
                        code: claim.mainAttributes.selectedRisk?.riskCode ?? mainRisk.mainRiskCode,
                    }
                }
            }
        };
    }
    else if (type === paymentOrderType.PolicyCancellation) {

        const mainRisks = sinkExchange.resolveContext('mainRisks');
        const mainRisk = mainRisks.find(r => r.contractNumber == input.body.paymentOrderInformation.contractNumber);

        return {
            input: {
                data: {
                    criteria: {
                        code: mainRisk.mainRiskCode,
                    }
                }
            }
        };
    }
};
