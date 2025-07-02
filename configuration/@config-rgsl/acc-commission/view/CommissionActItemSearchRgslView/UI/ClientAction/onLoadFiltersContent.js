const { commissionActStatusCode, commissionActItemStatusId } = require('@config-rgsl/acc-base/lib/actConsts');
const { isEmptyObject } = require('@config-system/infrastructure/lib/JsonUtils');

module.exports = function onLoadFiltersContent(input) {
    const criteria = input.context.request.data.criteria;

    if (isEmptyObject(criteria)) {
        criteria.groupByContract = true;
        criteria.actStateCodes = [
            commissionActStatusCode.DRAFT,
            commissionActStatusCode.CONFIRMING,
            commissionActStatusCode.CONFIRMED,
            commissionActStatusCode.APPROVED,
            commissionActStatusCode.COMPLETED_PAY_ORDER,
            commissionActStatusCode.COMPLETED_PAID,
            commissionActStatusCode.ANNULLED,
        ];
        criteria.statusIds = [
            commissionActItemStatusId.NORMAL,
            commissionActItemStatusId.NEW,
            commissionActItemStatusId.RENEW,
        ];
    }

    const protectedFields = [
        'groupByContract',
    ];

    this.setProtectedFields(protectedFields);
};
