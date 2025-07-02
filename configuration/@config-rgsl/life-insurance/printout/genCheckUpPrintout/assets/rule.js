'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { partnerCode, serviceCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);
    const OASpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == partnerCode.OAS;

    if (OASpartner) {
        if (additionalServices.some(item => item.serviceCode == serviceCode.GenCheckHealth))
        { appendix.push({
            name: `MedLifePrintoutAssets/applicationHealth.pdf`,
            mode: 'Append'
        }); }

        if (additionalServices.some(item => item.serviceCode == serviceCode.GenCheckSport))
        { appendix.push({
            name: `MedLifePrintoutAssets/applicationSport.pdf`,
            mode: 'Append'
        }); }

        if (additionalServices.some(item => item.serviceCode == serviceCode.GenCheckTalents))
        { appendix.push({
            name: `MedLifePrintoutAssets/applicationTalents.pdf`,
            mode: 'Append'
        }); }

        appendix.push({
            name: `MedLifePrintoutAssets/reminderPayment.pdf`,
            mode: 'Append'
        });
    }

    return appendix;

};
