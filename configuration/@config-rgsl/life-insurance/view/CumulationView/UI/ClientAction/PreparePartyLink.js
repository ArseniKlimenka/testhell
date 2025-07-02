'use strict';

module.exports = function PreparePartyLink(input) {

    const data = input.data;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'Party',
                configurationCodeName: 'NaturalPerson',
                version: 1,
                code: data.partyCode
            }
        }
    };
};
