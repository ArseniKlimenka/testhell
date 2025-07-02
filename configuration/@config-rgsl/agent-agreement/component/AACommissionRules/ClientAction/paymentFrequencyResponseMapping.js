'use strict';

module.exports = function paymentFrequencyResponseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        output = data.map((element) => {

            return {
                description: element.resultData['paymentFrequencyDescription'],
                code: element.resultData['paymentFrequencyCode']
            };
        });
    }

    return output;
};
