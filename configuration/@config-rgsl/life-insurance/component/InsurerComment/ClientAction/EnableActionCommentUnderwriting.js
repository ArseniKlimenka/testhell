const { quoteState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function EnableActionCommentUnderwriting(input) {

    const currentActor = getValue(input, 'context.WorkUnitActor.CurrentActor');
    const stateCode = getValue(input, 'context.State.Code');

    return currentActor == "Underwriter" && stateCode == quoteState.OnReview;

};
