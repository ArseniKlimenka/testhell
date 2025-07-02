'use strict';

module.exports = function applyData(partyPersonData) {

    const isStatelessPerson = partyPersonData?.isStatelessPerson;

    if (isStatelessPerson) {
        partyPersonData.citizenship = undefined;
    }

};
