'use strict';

const { nonFinancialAmendmentTransition } = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function mapping(input, sinkExchange) {

    const body = input.body;
    const amendmentData = body?.amendmentData;
    const selectedChangeTypes = amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.changeTypes ?? [];
    const changeTypesHasInvestmentParametersEdit = selectedChangeTypes.includes(changeTypes.investmentParametersEdit);
    const amendmentCreatedFromLifeInsuranceRequest = amendmentData?.nonFinChangeAmendmentData?.technicalData?.requestData?.number;
    const allowAutoTransition = amendmentCreatedFromLifeInsuranceRequest && changeTypesHasInvestmentParametersEdit;
    sinkExchange.allowAutoTransition = allowAutoTransition;

    if (allowAutoTransition) {

        return {
            businessNumber: input.number,
            transition: {
                transitionName: nonFinancialAmendmentTransition.OperationsApprovalToActivatedSystem,
                configurationName: input.configurationCodeName,
                configurationVersion: input.configurationVersion
            }
        };

    }

    return;

};
