'use strict';

module.exports = function onChangeDocumentCodeName(input, ambientProperties) {

    const documentCodeName = input.context.request.data.criteria.documentCodeName;

    if (!documentCodeName || documentCodeName?.length == 0 || (documentCodeName?.length == 1 && documentCodeName?.includes('LifeInsuranceQuote'))) {
        input.context.request.data.criteria.reasonCode = undefined;
    }

    this.view.reevaluateRules();
    this.view.validate();

};
