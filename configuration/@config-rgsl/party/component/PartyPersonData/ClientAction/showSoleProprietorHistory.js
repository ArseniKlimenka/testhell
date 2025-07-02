'use strict';

module.exports = function showSoleProprietorHistory(input, ambientProperties) {

    const naturalPersonCategory = input.componentContext.naturalPersonCategory ?? false;
    const soleProprietorHistory = input.componentContext.soleProprietorHistory ?? [];

    return naturalPersonCategory === "soleProprietor" || (soleProprietorHistory && soleProprietorHistory.length > 0);

};
