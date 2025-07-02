const { portfolioTransferStatusId, portfolioTransferStatusCode } = require('@config-rgsl/portfolio-transfer/lib/ptConsts');
const { actorConstants } = require('@config-rgsl/portfolio-transfer/lib/portfolioTransferViewConsts');

module.exports = function enablePtDocEditing(input) {

    const body = input.context.Body;
    const currentActor = input.context.WorkUnitActor.CurrentActor;

    return (body.statusId === portfolioTransferStatusId.DRAFT || input.rootContext.State?.Code === portfolioTransferStatusCode.DRAFT)
        && (currentActor === actorConstants.PORTFOLIO_TRANSFER_ADMIN);
};
