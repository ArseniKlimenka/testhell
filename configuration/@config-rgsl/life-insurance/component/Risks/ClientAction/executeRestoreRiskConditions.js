const { setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function executeRestoreRiskConditions(input, ambientProperties) {

    setValue(input, 'rootContext.Body.mainInsuranceConditions.isHardcoreDeletedRisk', false);
    setValue(input, 'rootContext.Body.mainInsuranceConditions.restoreAllRisks', true);
    setValue(input, 'rootContext.Body.riskConditions.isNeedRecalc', true);

    this.view.save();
};
