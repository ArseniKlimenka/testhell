const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');

module.exports = function reviewTabVisibility(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');

    const body = input.context.Body;
    const existsTrigger = flowRulesHelper.existsTrigger(body);

    return isBackOffice || existsTrigger;

};
