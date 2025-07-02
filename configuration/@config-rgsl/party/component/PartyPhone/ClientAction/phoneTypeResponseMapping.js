'use strict';

module.exports = function phoneTypeResponseMapping(input, ambientProperties) {

    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {

        output = input.response.data
            .map(elem => elem.resultData)
            .filter(elem => {
                return elem.phoneTypeDesc.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });

    }
    else {
        output.push(input.context.phoneType);
    }

    output.sort((a, b) => (a.phoneTypeDesc > b.phoneTypeDesc) ? 1 : ((b.phoneTypeDesc > a.phoneTypeDesc) ? -1 : 0));

    return output;

};
