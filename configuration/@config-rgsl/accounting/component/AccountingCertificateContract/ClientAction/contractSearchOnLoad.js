'use strict';

module.exports = function contractSearchOnLoad(input) {

    const lookup = this.getLookup();

    lookup.getControlByElementId('contractTypeId').disableElement();
};
