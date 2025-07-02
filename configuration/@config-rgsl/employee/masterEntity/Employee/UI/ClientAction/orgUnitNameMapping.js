'use strict';

module.exports = function orgUnitNameMapping(input) {

    return input.context.Body.orgUnitName ? "Открыть карточку подразделения" : undefined;

};
