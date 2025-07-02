'use strict';

module.exports = function diseaseClassResponseMapping(input) {

    const result = responseMapping(input);
    return result;
};

function responseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        output = data.map((element) => {

            const result = {};
            result.displayName = element.resultData['fullTextResult'];

            const objValue = {};
            objValue.code = element.resultData['code'];
            objValue.description = element.resultData['description'];

            result.value = objValue;
            return result;
        });
    }

    return output;
}
