'use strict';

module.exports = function partyClear(input) {

    input.context.Body.partyId = undefined;
    input.context.Body.partyCode = undefined;
    input.context.Body.partyDisplayName = undefined;
    input.context.Body.partyShortName = undefined;

};
