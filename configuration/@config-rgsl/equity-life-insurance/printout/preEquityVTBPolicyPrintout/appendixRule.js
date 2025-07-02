'use strict';

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = input?.body?.additionalServices ?? [];

    // ПФП
    if (additionalServices.some(item => item.serviceCode == "PFP")) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/memoPFP.pdf`,
            mode: 'Append'
        });
    }

    return appendix;

};
