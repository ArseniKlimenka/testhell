const { bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function initBsiRgslView(input, ambientProperties) {
    const registry = input.data.Body;

    const lookup = this.getLookup();
    const paymentStatusIds = [bankStatementItemStatusId.NOT_ALLOCATED];

    if (ambientProperties.currentWorkUnitActor === 'EmployeeUFO') {
        paymentStatusIds.push(bankStatementItemStatusId.PARTIALLY_ALLOCATED);
    }

    lookup.setSearchRequest({
        data: {
            criteria: {
                amount: registry.summary.totalPaymentAmount,
                paymentStatusIds: paymentStatusIds,
                isRegistry: true,
            }
        }
    });

    lookup.setProtectedFields([
        'paymentStatusIds',
        'isRegistry',
        'paymentStatusIds2',
        'isRegistry2',
    ], true);
};
