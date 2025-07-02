const { bankStatementItemStatusId, bankStatementDirection } = require('@config-rgsl/acc-base/lib/bankStatementEnums');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function initBsiRgslView(input) {

    const body = input.context.Body;
    const documentType = body.document.documentType;
    const lookup = this.getLookup();
    let direction;
    switch (documentType) {
        case allocationDocumentType.POLICY:
            direction = bankStatementDirection.INCOMING;
            break;
        case allocationDocumentType.PAYMENT_ORDER_OUTGOING:
            direction = bankStatementDirection.OUTGOING;
            break;
    }

    lookup.setSearchRequest({
        data: {
            criteria: {
                isRegistry: false,
                paymentStatusIds: [
                    bankStatementItemStatusId.NOT_ALLOCATED,
                    bankStatementItemStatusId.PARTIALLY_ALLOCATED,
                ],
                transactionDateFrom: dateUtils.getFirstDateOfMonth(),
                transactionDateTo: dateUtils.getLastDateOfMonth(),
                direction: direction,
            }
        }
    });

    const protectedFields = [
        'isRegistry',
        'paymentStatusIds',
    ];

    if (direction) {
        protectedFields.push('direction');
    }

    lookup.setProtectedFields(protectedFields, true);
};
