const { fullNameValidation, tabNumberValidation, emailValidation, mobTelValidation, visibilityTypeValidation, groupsValidation, rolesValidation, sendEmailValidation } = require('@config-rgsl/employee/lib/exportUserHelper');
module.exports = function resultMapping(input) {

    const mapped = {
        userName: input.userName ? input.userName : null
    };

    return {
        data: mapped,
        $recordKey: `${input.$rowNumber}`
    };
};
