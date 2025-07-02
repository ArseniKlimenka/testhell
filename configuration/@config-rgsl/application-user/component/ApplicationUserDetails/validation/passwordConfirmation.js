const { passwordConfirmation: passwordConfirmationHelper } = require('@config-system/application-user/lib/PasswordValidationHelper');

/**
 * @errorCode {errorCode} PasswordsDoNotMatch
 */
module.exports = function passwordConfirmation(input) {
    const { password, confirmPassword } = input;

    return passwordConfirmationHelper(password, confirmPassword);
};
