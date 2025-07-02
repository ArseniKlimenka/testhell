'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function partnerResponseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        output = data.map((element) => {

            const resultData = element.resultData;
            const partyName = resultData.partyDisplayName ?? resultData.partyShortName;
            const businessCode = resultData.businessCode;

            return {
                value: {
                    partnerCode: resultData.serviceProviderCode,
                    partnerDescription: resultData.partyDisplayName,
                    partnerShortDescription: resultData.partyShortName,
                    partnerBusinessCode: resultData.businessCode,
                },
                displayName: `${partyName} (${businessCode})`
            };
        });
    }

    return output;
};
