'use strict';

module.exports = function showRelationType(input, ambientProperties) {

    const isPublicOfficial = input.componentContext.isPublicOfficial ?? false;
    const executivePersonCode = input.componentContext.executivePerson?.executivePersonCode;

    if (isPublicOfficial && executivePersonCode == '4') {
        return true;
    }

    return false;


};
