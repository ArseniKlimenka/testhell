'use strict';

module.exports = function partyPhonesOnPrepareAddedRow(input, ambientProperties) {

    input.affectedRow.countryCode = {
        countryCode: 643,
        alfa2: 'RU',
        countryShortName: 'РОССИЯ',
        countryPhoneCode: '+7'
    };

    return true;

};
