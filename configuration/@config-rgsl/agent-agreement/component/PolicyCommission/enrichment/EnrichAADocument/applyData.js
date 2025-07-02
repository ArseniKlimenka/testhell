const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, dataSourceResponse) {

    const resultData = getValue(dataSourceResponse, 'data.0.resultData');

    if (!resultData) {

        return;
    }

    const aaNumber = resultData.manualNumber ?? resultData.documentCode;

    input.agentAgreement = {
        id: resultData.id,
        number: resultData.documentCode,
        manualNumber: resultData.manualNumber,
        externalNumber: resultData.externalNumber,
        formatedNumber: `${aaNumber}/${resultData.externalNumber}`,
        isTechnical: resultData.isTechnical
    };
};
