const { getInsuranceProductFilter } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = async function onChangeExcludedProduct(input, ambientProperties) {

    const body = input.context.Body;
    const productGroup = body.products.excludedGroup;
    const issueDate = body.actIssueDate;
    const partnerBusinessCode = body.agentBusinessCode;

    const intersections = input.context.ClientViewModel.intersections;
    if (intersections.mustBeExcluded) {
        let newProducts = input.context.ClientViewModel.allProducts.filter(_ => intersections.mustBeExcluded.includes(_.productCode));
        newProducts = newProducts.filter(_ => !body.products.excluded.includes(_.productCode));
        newProducts = getInsuranceProductFilter(ambientProperties, newProducts, productGroup, partnerBusinessCode, issueDate, false, {});

        if (newProducts.length !== 0) {
            const items = [...body.products.excluded, ...newProducts.map(_ => _.productCode)];
            const e = this.view.getControlByElementId('excludedProductsElementId');
            e.setValue(items);
        }
    }
};
