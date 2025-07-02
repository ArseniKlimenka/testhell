const { mainRiskCodeConstants } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

async function getMainRiskCode(productCode, ambientProperties) {

    let mainRiskCode;

    if (productCode) {
        const request = {
            method: 'post',
            url: 'api/core/shared/business-rules/TariffConstantsRule/1',
            data: {
                productCode: productCode,
            },
        };

        const result = await ambientProperties.services.api.call(request);
        mainRiskCode = result.data.mainRiskCode ?? mainRiskCodeConstants.NO_MAIN_RISK;
    }

    return mainRiskCode;
}

module.exports = {
    getMainRiskCode,
};
