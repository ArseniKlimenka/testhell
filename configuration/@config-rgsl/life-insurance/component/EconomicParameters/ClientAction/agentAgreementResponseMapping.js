'use strict';

module.exports = function agentAgreementResponseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        output = data.map((element) => {

            const resultData = element.resultData;
            const agentAgreementNumber = resultData.agentAgreementNumber;
            const manualNumber = resultData.manualNumber;
            const externalNumber = resultData.externalNumber;
            const aaNumber = manualNumber ?? agentAgreementNumber;
            const aaName = `${aaNumber}/${externalNumber}`;

            return {
                value: {
                    id: resultData.agentAgreementId,
                    number: resultData.agentAgreementNumber,
                    manualNumber: resultData.manualNumber,
                    externalNumber: resultData.externalNumber,
                    partnerBusinessCode: resultData.partnerCode,
                    partnerPartyCode: resultData.partyCode,
                    aaName: aaName
                },
                displayName: aaName
            };
        });
    }

    return output;
};
