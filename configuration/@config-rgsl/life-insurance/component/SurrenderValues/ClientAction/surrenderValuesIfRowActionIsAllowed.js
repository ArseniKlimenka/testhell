const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function surrenderValuesIfRowActionIsAllowed(input, ambientProperties) {

    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;

    if (isSaveOperationAvailable(this.view) && amendmentType === changeAmendmentTypes.financialChange && (state === 'Draft' || state === 'OperationsApproval')) {

        return {
            delete: false,
            edit: true
        };
    }

    return {
        delete: false,
        edit: false
    };
};
