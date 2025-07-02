const { actorConstants } = require('@config-rgsl/acc-commission/lib/actViewConsts');

module.exports = function enableSetStatusOnSelection(input) {
    const items = input.context.selection;
    const currentActor = input.context.WorkUnitActor.CurrentActor;

    if (items &&
        items.length > 0 &&
        (currentActor === actorConstants.COMMISSION_ACT_ADMIN) &&
        items.every(_ => _.resultData.actStateCode === items[0].resultData.actStateCode)) {
        this.enableElement();
    }
    else { this.disableElement(); }
};
