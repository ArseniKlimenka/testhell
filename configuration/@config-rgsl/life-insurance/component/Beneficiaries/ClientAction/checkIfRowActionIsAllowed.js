'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function checkIfRowActionIsAllowed(input, ambientProperties) {

    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;

    if ((this.view.areAllElementsDisabled() && !amendmentType)
        || !isSaveOperationAvailable(this.view)
        || (amendmentType && amendmentType !== changeAmendmentTypes.nonFinancialChange)) {

        return {
            delete: false,
            edit: false
        };
    }

    const amendmentData = input.context.Body.amendmentData?.nonFinChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];
    const initialBeneficiaries = amendmentData?.technicalData?.beneficiaryData?.initial ?? [];

    if (amendmentType) {

        if (state === 'OperationsApproval') {

            return {
                delete: selectedChangeTypes.includes(changeTypes.beneficiarySelection),
                edit: selectedChangeTypes.includes(changeTypes.beneficiaryEdit) ||
                (selectedChangeTypes.includes(changeTypes.beneficiarySelection) && !initialBeneficiaries.includes(input.affectedRow.beneficiaryId))
            };
        }


        return {
            delete: false,
            edit: false
        };

    }

    return {
        delete: true,
        edit: true
    };
};
