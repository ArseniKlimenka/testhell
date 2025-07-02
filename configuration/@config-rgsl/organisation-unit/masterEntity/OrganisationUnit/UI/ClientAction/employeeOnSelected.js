const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function employeeOnSelected(input) {

    const employeeCodeSelected = input.getLookupSelection()[0].resultData.serviceProviderCode;
    const employeeFullNameSelected = input.getLookupSelection()[0].resultData.partyDisplayName;

    const dataProperty = input.dataProperty;
    const employeeCodePath = `context.Body.${dataProperty}.employeeCode`;
    const employeeFullNamePath = `context.Body.${dataProperty}.employeeFullName`;

    input.context.Body[`${dataProperty}`] = input.context.Body[`${dataProperty}`] || {};
    setValue(input, employeeCodePath, employeeCodeSelected);
    setValue(input, employeeFullNamePath, employeeFullNameSelected);

};
