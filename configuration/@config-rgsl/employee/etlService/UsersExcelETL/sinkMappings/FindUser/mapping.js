const { additionalroles } = require('@config-rgsl/employee/lib/userExcelETLconst');

module.exports = function mapping(lineInput) {

    const tabNumber = lineInput.data.username;

    return {
        input: {
            data: {
                criteria: {
                    tabNumber
                }
            }
        }
    };
};

