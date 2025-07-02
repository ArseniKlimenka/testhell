'use strict';

const { arrayAttributesArr, objectAttributesArr, objectWrongAttributesArr } = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesHelper');

module.exports = function initLoadedDataFromExcel(input) {

    const attributesToString = [...arrayAttributesArr, ...objectAttributesArr, ...objectWrongAttributesArr];

    this.getCurrentView().setSearchRequest({
        data: {
            criteria: {
                importDocumentId: input.context.Id,
                attributesToString: attributesToString
            }
        }
    });

    this.getCurrentView().search();
};
