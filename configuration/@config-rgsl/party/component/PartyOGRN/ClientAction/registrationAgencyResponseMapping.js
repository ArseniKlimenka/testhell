'use strict';
module.exports = function registrationAgencyResponseMapping(input, ambientProperties) {

    let output = [];
    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data
            .map(elem => elem.resultData)
            .filter(elem => {
                return elem.agencyDescription.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });
    }
    else {
        output.push(input.context.agency);
    }

    return output.sort((a, b) => (a.agencyDescription > b.agencyDescription) ? 1 : ((b.agencyDescription > a.agencyDescription) ? -1 : 0));

};
