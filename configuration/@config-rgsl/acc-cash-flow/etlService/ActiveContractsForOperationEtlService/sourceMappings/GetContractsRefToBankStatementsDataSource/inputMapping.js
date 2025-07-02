const { bankStatementDirection, bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                currentStatus: "Draft",
                issueFormCode: [ "paper", "offer" ],
                direction: bankStatementDirection.INCOMING,
                paymentStatusIds: [ bankStatementItemStatusId.NOT_ALLOCATED, bankStatementItemStatusId.PARTIALLY_ALLOCATED ],
            }
        }
    };
};
