const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function (input) {
    return {
        data: {
            criteria: {
                documentTypeId: allocationDocumentType.POLICY,
                paymentDateFrom: input.data.criteria.issueDateFrom
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };
};
