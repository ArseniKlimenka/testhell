const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(input, sinkExchange) {

    const type = input.body.paymentOrderInformation.paymentOrderType;

    if (type === paymentOrderType.Claim) {

        const claim = sinkExchange.resolveContext('claimBody') ?? sinkExchange.resolveContext('endowmentBody');
        return {
            input: {
                data: {
                    criteria: {
                        contractNumbers: [claim.mainAttributes.contract.number],
                    }
                }
            }
        };
    }
    else if (type === paymentOrderType.PolicyCancellation) {

        return {
            input: {
                data: {
                    criteria: {
                        contractNumbers: [input.body.paymentOrderInformation.contractNumber],
                    }
                }
            }
        };
    }
};
