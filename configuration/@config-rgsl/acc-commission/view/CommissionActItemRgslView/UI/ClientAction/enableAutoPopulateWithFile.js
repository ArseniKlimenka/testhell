const { commissionActStatusId, commissionActStatusCode } = require('@config-rgsl/acc-base/lib/actConsts');
const { actorConstants } = require('@config-rgsl/acc-commission/lib/actViewConsts');

module.exports = function enableAutoPopulateWithFile(input) {
    const body = input.rootContext.Body;
    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;
    return (body.actId || input.rootContext.Number) &&
        (body.statusId === commissionActStatusId.DRAFT || input.rootContext.State?.Code === commissionActStatusCode.DRAFT) &&
        currentActor === actorConstants.COMMISSION_ACT_ADMIN;
};
