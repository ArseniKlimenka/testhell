module.exports = function mapping(input) {

    const contractNumber = this.businessContext.documentNumber;

    if (!contractNumber) { return; }

    const output = {
        data: {
            criteria: {
                refDocumentNo: contractNumber
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };

    return output;

};
