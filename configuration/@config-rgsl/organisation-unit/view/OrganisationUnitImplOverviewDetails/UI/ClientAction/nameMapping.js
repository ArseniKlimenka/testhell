'use strict';

module.exports = function nameMapping(input, ambientProperties) {

    const orgUnitName = input.context?.viewContext?.name ?? '';
    return orgUnitName ? `Открыть карточку ${orgUnitName}` : undefined;
};
