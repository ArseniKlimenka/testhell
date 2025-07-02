const triggerUtils = require('@config-rgsl/life-insurance/lib/triggerUtils');

module.exports = function applyData (input) {

    const body = this.businessContext.rootData;
    const isCollectivePolicy = this.businessContext.configurationCodeName == 'CollectiveLifeInsurancePolicy';

    triggerUtils.setTriggers(body, isCollectivePolicy);
};
