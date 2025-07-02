module.exports = function mapping(input) {

    const {
        number,
        body,
    } = input;

    return {
        'ACC_IMPL.PORTFOLIO_TRANSFER_HUB': [{
            PORTFOLIO_TRANSFER_NUMBER: number,
        }],
        'ACC_IMPL.PORTFOLIO_TRANSFER_SAT': [{
            PORTFOLIO_TRANSFER_NUMBER: number,
            AGENT_TAB_NUMBER_FROM: body.agentTabNumberFrom,
            AGENT_TAB_NUMBER_TO: body.agentTabNumberTo,
            SAD_NUMBER_FROM: body.sadNumberFrom,
            SAD_NUMBER_TO: body.sadNumberTo,
            ISSUE_DATE: body.issueDate,
            SERVICE_PROVIDER_CODE_FROM: body.aaServiceProviderCodeFrom,
            SERVICE_PROVIDER_CODE_TO: body.aaServiceProviderCodeTo,
            SERVICE_PROVIDER_NAME_FROM: body.aaServiceProviderNameFrom,
            SERVICE_PROVIDER_NAME_TO: body.aaServiceProviderNameTo,
            AA_NUMBER_FROM: body.aaNumberFrom,
            AA_NUMBER_TO: body.aaNumberTo,
        }],
    };
};
