const { portfolioTransferStatusId, portfolioTransferStatusCode } = require('@config-rgsl/portfolio-transfer/lib/ptConsts');

module.exports = function canExportReport(input) {

    const body = input.context.Body;

    return !this.view.isDirty()
        && input.context.Number
        && ((body.statusId === portfolioTransferStatusId.PROCESSED || input.rootContext.State?.Code === portfolioTransferStatusCode.PROCESSED)
            || (body.statusId === portfolioTransferStatusId.PROCESSED_WITH_ERRORS || input.rootContext.State?.Code === portfolioTransferStatusCode.PROCESSED_WITH_ERRORS));
};
