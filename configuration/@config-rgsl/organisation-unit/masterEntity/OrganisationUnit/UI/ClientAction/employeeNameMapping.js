const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function employeeNameMapping(input) {

    const dataProperty = input.dataProperty;
    const employeeCodePath = `context.Body.${dataProperty}.employeeCode`;
    const employeeCode = getValue(input, employeeCodePath);

    return employeeCode ? "Открыть карточку сотрудника" : undefined;

};
