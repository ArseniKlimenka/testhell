'use strict';

module.exports = function partnerNameMapping(input) {

    return input.context.Body.partnerName ? "Открыть карточку партнера" : undefined;

};
