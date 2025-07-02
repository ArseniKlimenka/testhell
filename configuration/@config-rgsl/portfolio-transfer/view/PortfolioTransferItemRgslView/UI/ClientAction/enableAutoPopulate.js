const { portfolioTransferStatusId, portfolioTransferStatusCode } = require('@config-rgsl/portfolio-transfer/lib/ptConsts');
const { actorConstants } = require('@config-rgsl/portfolio-transfer/lib/portfolioTransferViewConsts');

module.exports = function enableAutoPopulate(input) {

    const body = input.rootContext.Body;
    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;

    return (input.rootContext.Number) &&
        (body.statusId === portfolioTransferStatusId.DRAFT || input.rootContext.State?.Code === portfolioTransferStatusCode.DRAFT) &&
        currentActor === actorConstants.PORTFOLIO_TRANSFER_ADMIN;
};
