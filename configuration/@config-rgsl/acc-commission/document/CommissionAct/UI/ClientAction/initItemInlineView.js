const { commissionActStatusCode, commissionActItemStatusId } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = function initItemInlineView(input) {

    const actNo = input.context.Number;
    const actStatusCode = input.context.State.Code;
    const actStatusIsDraft = actStatusCode == commissionActStatusCode.DRAFT;

    const protectedFields = [
        'actNo',
        'statusIds',
        'groupByContract',
    ];
    this.getCurrentView().setProtectedFields(protectedFields);

    if (actNo) {
        const withoutDeleted = [commissionActItemStatusId.NORMAL, commissionActItemStatusId.NEW, commissionActItemStatusId.RENEW];
        const request = {
            data: {
                criteria: {
                    actNo,
                    groupByContract: true,
                    statusIds: actStatusIsDraft ? undefined : withoutDeleted,
                }
            }
        };

        this.getCurrentView().setSearchRequest(request);
        this.getCurrentView().search();
    }
};
