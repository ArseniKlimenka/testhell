const { additionalroles } = require('@config-rgsl/employee/lib/userExcelETLconst');

module.exports = function mapping(input) {

    return {
        input: {
            data: {
                criteria: {
                    code: additionalroles
                }
            }
        }
    };
};

