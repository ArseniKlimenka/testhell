'use strict';

const { policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function applyData(input, dataSourceResponse) {

    const body = this.businessContext.rootData;

    if (dataSourceResponse?.data?.length === 1) {

        const policyStatesForContinueFromOnReview = [policyState.Activated];
        const stateCode = dataSourceResponse.data[0].resultData.stateCode;

        if (policyStatesForContinueFromOnReview.includes(stateCode)) {
            body.technicalInformation.policyInCorrectStatus = true;
        } else {
            body.technicalInformation.policyInCorrectStatus = false;
        }

    } else {
        body.technicalInformation.policyInCorrectStatus = false;
    }

};
