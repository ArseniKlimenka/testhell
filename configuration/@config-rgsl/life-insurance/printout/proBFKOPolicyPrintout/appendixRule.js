'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function appendixRule(input) {

    const appendix = [];
    const additionalServices = getValue(input, 'body.additionalServices', []);

    if (additionalServices.some(item => item.serviceCode == "MED76") && additionalServices.some(item => item.serviceCode == "MED77") && additionalServices.some(item => item.serviceCode == "MED78"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoGenCheckDms.pdf`,
        mode: 'Append'
    }); }

    if (additionalServices.some(item => item.serviceCode == "MED74"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoHealthDms.pdf`,
        mode: 'Append'
    }); }

    if (additionalServices.some(item => item.serviceCode == "MED75"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoZozhDms.pdf`,
        mode: 'Append'
    }); }

    return appendix;
};
