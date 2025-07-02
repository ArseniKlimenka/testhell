'use strict';

const { commissionActStatusCode, commissionActItemStatusId } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = async function clearFilter(input, ambientProperties) {

    const actStatusCode = input.rootContext.State.Code;
    const actStatusIsDraft = actStatusCode == commissionActStatusCode.DRAFT;
    const withoutDeleted = [commissionActItemStatusId.NORMAL, commissionActItemStatusId.NEW, commissionActItemStatusId.RENEW];

    const request = input.context.request;
    request.data.criteria.statusIds = actStatusIsDraft ? undefined : withoutDeleted;
};
