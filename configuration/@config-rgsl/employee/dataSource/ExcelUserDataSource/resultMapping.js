const { fullNameValidation, tabNumberValidation, emailValidation, mobTelValidation, visibilityTypeValidation, groupsValidation, rolesValidation, sendEmailValidation } = require('@config-rgsl/employee/lib/exportUserHelper');
module.exports = function resultMapping(input) {

    const mapped = {
        DOCode: input.DOCode ? input.DOCode : null, // валидации нет, т.к. нужен справочник кодов
        position: input.position ? input.position : '',
        fullName: fullNameValidation(input.fullName),
        tabNumber: tabNumberValidation(input.tabNumber),
        email: emailValidation(input.email),
        mobTel: mobTelValidation(input.mobTel),
        visibilityType: visibilityTypeValidation(input.visibilityType),
        groups: groupsValidation(input.groups),
        roles: rolesValidation(input.roles),
        username: input.username,
        sendEmail: sendEmailValidation(input.sendEmail)
    };

    return {
        data: mapped,
        $recordKey: `${input.$rowNumber}`
    };
};
