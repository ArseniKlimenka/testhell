'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function setManualCommission(input) {

    const manualRate = input.componentContext.tempData.manualRate;
    const manualAmount = input.componentContext.tempData.manualAmount;
    const manualExpensesRate = input.componentContext.tempData.manualExpensesRate;
    const manualNatuaralPersonRate = input.componentContext.tempData.manualNatuaralPersonRate;
    const manualSolePropriatorRate = input.componentContext.tempData.manualSolePropriatorRate;
    const selectedItems = this.view.getControlByElementId('commissionTable').dataSource.selectionModel.selected();
    const productCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const EBMGVTB = [lifeInsuranceConstants.product.EBMGVTB].includes(productCode);

    if (EBMGVTB) { input.context.Body.basicConditions.isSpecialOffer = false; }

    if (!selectedItems || selectedItems.length === 0) {

        return;
    }

    selectedItems.forEach(item => {

        item.manualRate = manualRate;
        item.manualAmount = manualAmount;
        item.manualExpensesRate = manualExpensesRate;
        item.manualNatuaralPersonRate = manualNatuaralPersonRate;
        item.manualSolePropriatorRate = manualSolePropriatorRate;
        item.isChanged = true;
    });

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
