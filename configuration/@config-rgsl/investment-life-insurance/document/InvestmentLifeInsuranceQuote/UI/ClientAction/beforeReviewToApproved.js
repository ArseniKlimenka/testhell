const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = async function beforeReviewToApproved(input, ambientProperties) {

    const checkKPKResult = await flowRulesHelper.checkKPK(input, ambientProperties);

    if (checkKPKResult.length > 0) {
        const message = checkKPKResult.join(" ");
        throw message;
    }
};
