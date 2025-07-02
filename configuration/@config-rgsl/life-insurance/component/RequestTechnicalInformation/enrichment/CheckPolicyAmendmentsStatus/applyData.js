'use strict';

module.exports = function applyData(input, dataSourceResponse) {

    const body = this.businessContext.rootData;

    if (dataSourceResponse?.data?.length > 0) {
        body.contract.lastAmendmentNumber = dataSourceResponse.data.sort((a, b) => b.resultData.seqNumber - a.resultData.seqNumber)[0].resultData.contractNumber;
    }
    body.contract.isAmendmentsOnPolicy = dataSourceResponse.data.length > 1;

    if (dataSourceResponse?.data?.length > 1) {

        const createdFinAmendmentNumber = body.contract.createdFinAmendmentNumber;
        const createdNonFinAmendmentNumber = body.contract.createdNonFinAmendmentNumber;
        const createdPolicyHolderChangeAmendmentNumber = body.contract.createdPolicyHolderChangeAmendmentNumber;
        body.technicalInformation.finAmendmentWasCreated = dataSourceResponse.data.filter(item => item.resultData.versionState == 'Applied' && item.resultData.contractNumber == createdFinAmendmentNumber).length > 0;
        body.technicalInformation.nonFinAmendmentWasCreated = dataSourceResponse.data.filter(item => item.resultData.versionState == 'Applied' && item.resultData.contractNumber == createdNonFinAmendmentNumber).length > 0;
        body.technicalInformation.finPolicyHolderAmendmentWasCreated = dataSourceResponse.data.filter(item => item.resultData.versionState == 'Applied' && item.resultData.contractNumber == createdPolicyHolderChangeAmendmentNumber).length > 0;

        const policyAmendmentsNotInCorrectStatus = dataSourceResponse.data.filter(item => !item.resultData.versionState).length > 0;
        if (policyAmendmentsNotInCorrectStatus) {
            body.technicalInformation.policyAmendmentsInCorrectStatus = false;
        } else {
            body.technicalInformation.policyAmendmentsInCorrectStatus = true;
        }
    } else {
        body.technicalInformation.policyAmendmentsInCorrectStatus = true;
    }

};
