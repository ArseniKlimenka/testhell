const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = async function checkKPK(input, ambientProperties) {

    const productCode = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productCode');
    if (productCode == 'CACB') {
        return;
    }

    const checkKPKResult = await flowRulesHelper.checkKPK(input, ambientProperties);

    if (checkKPKResult.length > 0) {
        const message = checkKPKResult.join(" ");
        throw message;
    }

};
