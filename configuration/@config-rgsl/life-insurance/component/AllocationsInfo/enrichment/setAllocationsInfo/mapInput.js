const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapInput(input) {

    const originalDocumentNumber = this.businessContext.originalDocumentNumber;

    if (!originalDocumentNumber) {

        return;
    }

    return {
        data: {
            criteria: {
                refDocumentNo: originalDocumentNumber
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };

};
