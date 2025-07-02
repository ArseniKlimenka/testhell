const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function employeeURLMapping(input) {

    const dataProperty = input.dataProperty;
    const employeeCodePath = `context.Body.${dataProperty}.employeeCode`;
    const employeeCode = getValue(input, employeeCodePath);

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "ServiceProvider",
                configurationCodeName: "Employee",
                code: employeeCode,
                version: "1"
            }
        }
    };

};
