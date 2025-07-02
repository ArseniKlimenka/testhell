const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');

module.exports = async function checkKPK(input, ambientProperties) {

    const checkKPKResult = await flowRulesHelper.checkKPK(input, ambientProperties);

    if (checkKPKResult.length > 0) {
        const message = checkKPKResult.join(" ");
        throw message;
    }

};
