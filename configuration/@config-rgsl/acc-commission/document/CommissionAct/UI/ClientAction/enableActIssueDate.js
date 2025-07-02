const { commissionActStatusId } = require('@config-rgsl/acc-base/lib/actConsts');
const { actorConstants } = require('@config-rgsl/acc-commission/lib/actViewConsts');

module.exports = function enableActIssueDate(input) {
    const body = input.context.Body;
    const currentActor = input.context.WorkUnitActor.CurrentActor;
    return (!body.actId || body.statusId === commissionActStatusId.DRAFT || body.statusId === commissionActStatusId.CONFIRMED) &&
            (currentActor === actorConstants.COMMISSION_ACT_ADMIN);
};
