'use strict';

const { defaultClaimBeneficiaryReason, defaultClaimBeneficiaryPaymentType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function applicantResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();
    const view = this.view;

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const partyType = lookupSelection[0].resultData.partyType ?? lookupSelection[0].metadata.configurationName;

        input.data.Body.mainAttributes.applicationInfo.applicant = {
            partyCode: lookupSelection[0].resultData.code,
            partyType: partyType,
            fullName: lookupSelection[0].resultData.fullName
        };

        const message = 'Заявитель и выгодоприобретатель - одно лицо?';
        const result = await ambientProperties.services.confirmationDialog.showConfirmation(message, 'Да', 'Нет', 3);

        if (result) {

            const applicant = input.data.Body.mainAttributes.applicationInfo.applicant;

            const currentBeneficiaries = input.data.Body.claimBeneficiaries || [];
            const sameCodeBeneficiary = currentBeneficiaries.find(item => item.partyCode === applicant.code && item.partyType === applicant.partyType);

            if (!sameCodeBeneficiary) {

                currentBeneficiaries.push(
                    {
                        partyCode: applicant.partyCode,
                        partyType: applicant.partyType,
                        fullName: applicant.fullName,
                        beneficiaryReason: defaultClaimBeneficiaryReason,
                        beneficiaryPaymentType: defaultClaimBeneficiaryPaymentType,
                    });

                input.data.Body.claimBeneficiaries = currentBeneficiaries;
            }
        }
    }

    view.rebind();
    view.reevaluateRules();
    view.validate();
};
