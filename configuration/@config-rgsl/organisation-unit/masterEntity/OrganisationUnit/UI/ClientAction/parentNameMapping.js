'use strict';

module.exports = function parentNameMapping(input) {

    return input.context.Body.parentName ? "Открыть карточку родителя" : undefined;

};
