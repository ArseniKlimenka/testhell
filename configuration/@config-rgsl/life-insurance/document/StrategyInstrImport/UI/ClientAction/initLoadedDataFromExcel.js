'use strict';

const { arrayAttributesArr, objectAttributesArr, objectWrongAttributesArr, couponPeriods } = require('@config-rgsl/life-insurance/lib/strategyInstrHelper');

module.exports = function initLoadedDataFromExcel(input) {

    const attributesToString = [...arrayAttributesArr, ...objectAttributesArr, ...objectWrongAttributesArr, ...couponPeriods];

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
