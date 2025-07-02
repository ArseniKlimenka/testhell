'use strict';

module.exports = function showPartyCode(input) {

    const shoudShowPartyCode = this.view.getContext().viewContext.shoudShowPartyCode;
    return !!shoudShowPartyCode;
};
