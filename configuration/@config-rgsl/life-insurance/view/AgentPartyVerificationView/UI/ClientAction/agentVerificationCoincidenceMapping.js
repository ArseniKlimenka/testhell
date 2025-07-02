'use strict';

module.exports = function agentVerificationCoincidenceMapping(input) {

    const foundCodes = input.data?.resultData?.foundCodes?.split(",");
    const currentParty = input.rootContext.Code;

    if (foundCodes?.includes(currentParty)) {
        return 'Да';
    }

    return 'Нет';
};
