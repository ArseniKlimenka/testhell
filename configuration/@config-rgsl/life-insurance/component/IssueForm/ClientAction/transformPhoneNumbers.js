'use strict';

module.exports = function transformPhoneNumbers(input) {

    let array = input.items;

    array = array.map(item => {

        return {
            fullNumber: `${item.countryCode.countryPhoneCode}${item.fullNumber}`,
            fullNumberFormatted: item.fullNumberFormatted
        };
    });

    return array;
};
