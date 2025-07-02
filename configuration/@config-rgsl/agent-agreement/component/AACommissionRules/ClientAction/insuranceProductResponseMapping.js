'use strict';

const productConfigurationCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');

module.exports = function insuranceProductResponseMapping(input, ambientProperties) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        const resultData = data.map(i => i.resultData);
        const startDate = input.rowContext?.startDate;
        const partnerBusinessCode = input.rootContext.Body.participants?.agent?.businessCode;

        const singleByIssueDateOutput = resultData?.filter(pc => startDate >= pc.issueDateFrom && startDate <= pc.issueDateTo);
        const singleProducts = singleByIssueDateOutput.filter(item => item?.partnerBusinessCode == partnerBusinessCode);
        const singleUniversalProducts = singleByIssueDateOutput.filter(item => !item?.partnerBusinessCode);

        const corpProducts = resultData
            .filter(item => productConfigurationCorp({ productCode: item.productCode, issueDate: startDate })?.partnerBusinessCode == partnerBusinessCode);

        const productsToDisplay = [...singleProducts, ...singleUniversalProducts, ...corpProducts];

        output = productsToDisplay.map((element) => {

            return {
                description: element.productDescription,
                code: element.productCode
            };
        });
    }

    return output;
};
