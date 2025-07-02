const { actorConstants } = require('@config-rgsl/acc-commission/lib/actViewConsts');

module.exports = function enableOriginalReceiptDate(input) {
    return input.context.WorkUnitActor.CurrentActor === actorConstants.COMMISSION_ACT_ADMIN;
};
