'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { productCode, product, productDescription, policyState, actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function enableCommTable(input) {

    const currentState = input.rootContext.State.Code;
    const contractType = input.rootContext.Dimensions.contractType;
    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;
    const isCommissionRateEdit = input.rootContext.Body.amendmentData?.finChangeAmendmentData?.mainAttributes?.changeTypes?.some(item => item === changeTypes.commissionRateEdit);

    if ((this.view.areAllElementsDisabled() || !isSaveOperationAvailable(this.view)) && !isCommissionRateEdit) {

        return false;
    }
    else if (contractType === 'Policy' && (currentState !== policyState.Draft || currentActor !== actor.Operations)) {

        return false;
    }

    return true;
};
