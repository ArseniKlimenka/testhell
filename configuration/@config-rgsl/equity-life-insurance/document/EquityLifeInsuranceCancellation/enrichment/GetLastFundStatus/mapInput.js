module.exports = function (externalData, body, componentContext) {

    if (!this?.businessContext?.originalDocumentNumber) { return null; }
    return {
        data: {
            criteria: {
                documentNumber: this.businessContext.originalDocumentNumber,
                isLatestReportDate: true
            }
        }
    };
};
