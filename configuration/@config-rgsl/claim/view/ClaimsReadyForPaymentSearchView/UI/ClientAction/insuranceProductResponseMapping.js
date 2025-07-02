'use strict';

module.exports = function insuranceProductResponseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        output = data.map((element) => {

            return {
                productCode: element.resultData.productCode,
                productDescription: element.resultData.productDescription
            };
        });
    }

    return output;
};
