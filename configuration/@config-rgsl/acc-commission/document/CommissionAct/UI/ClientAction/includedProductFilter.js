const { getInsuranceProductFilter } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = function includedProductFilter(input, ambientProperties) {
    const body = input.context.Body;
    const productGroup = body.products.includedGroup;
    const issueDate = body.actIssueDate;
    const partnerBusinessCode = body.agentBusinessCode;

    let items = input.items;
    if ((input.context.ClientViewModel.intersections?.couldBeIncluded?.length || 0) > 1) {
        items = items.filter(_ => input.context.ClientViewModel.intersections.couldBeIncluded.includes(_.productCode));
    }

    return getInsuranceProductFilter(ambientProperties, items, productGroup, partnerBusinessCode, issueDate, false, {});
};
