'use strict';

module.exports = function variantResponseMapping(input, ambientProperties) {

    let output = [];
    const variantsData = input.response?.data ?? [];


    if (variantsData.length > 0) {

        output = variantsData.map((element) => {

            const version = element.resultData['variantVersion'];
            const versionString = version ? `(${version})` : '';

            return {
                value: {
                    variantDescription: element.resultData['variantDescription'],
                    variantCode: element.resultData['variantCode']
                },
                displayName: `${element.resultData['variantDescription']} ${versionString}`
            };
        });
    }

    return output;
};
