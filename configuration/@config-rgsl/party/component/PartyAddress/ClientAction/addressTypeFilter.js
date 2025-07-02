'use strict';

const { partyType, viewType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function addressTypeFilter(input, ambientProperties) {

    const currentItems = input.items;
    let filteredItems = currentItems;

    const editConfName = ambientProperties?.configurationCodeName;

    if (input.rootContext.ConfigurationCodeName === partyType.NaturalPerson || editConfName === viewType.NaturalPerson) {
        filteredItems = currentItems.filter(item => !['RE', 'FE', 'PE'].includes(item.addressTypeCode));
    }

    return filteredItems;
};
