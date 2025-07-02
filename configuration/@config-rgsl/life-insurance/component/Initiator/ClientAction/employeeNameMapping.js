'use strict';

module.exports = function employeeNameMapping(input) {

    return input.componentContext.employeeCode ? "Открыть карточку сотрудника" : undefined;

};
