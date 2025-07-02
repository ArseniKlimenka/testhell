'use strict';

module.exports = function addressTypeResponseMapping(input, ambientProperties) {

    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {

        output = input.response.data
            .map(elem => elem.resultData)
            .filter(elem => {
                return elem.addressTypeDesc.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });

    }
    else {
        output.push(input.context.addressType);
    }

    output.sort((a, b) => (a.addressTypeCode < b.addressTypeCode) ? 1 : ((b.addressTypeCode < a.addressTypeCode) ? -1 : 0));

    return output;

};
