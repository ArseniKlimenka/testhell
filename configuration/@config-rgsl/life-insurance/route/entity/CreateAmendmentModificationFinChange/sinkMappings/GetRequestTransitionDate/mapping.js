const { productCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, sinkExchange) {

    if (input.number && !input.body?.contract?.configurationName !== productCode.EquityLifeInsurancePolicy) {
        return {
            input: {
                data: {
                    criteria: {
                        documentCode: input.number
                    }
                }
            }
        };
    }

    return null;
};
