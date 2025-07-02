'use strict';

module.exports = function applyData(partyPersonData) {

    const isPublicOfficial = partyPersonData?.isPublicOfficial;

    if (!isPublicOfficial) {
        partyPersonData.executivePerson = {
            executivePersonDesc: "Не является ПДЛ",
            executivePersonCode: "6"
        };
    }

};
