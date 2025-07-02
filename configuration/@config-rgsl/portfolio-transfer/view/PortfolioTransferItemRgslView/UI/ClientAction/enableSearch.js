const { actorConstants } = require('@config-rgsl/portfolio-transfer/lib/portfolioTransferViewConsts');

module.exports = function enableSearch(input) {

    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;

    return (input.rootContext.Number) &&
        currentActor === actorConstants.PORTFOLIO_TRANSFER_ADMIN;
};
