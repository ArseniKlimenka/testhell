const { passwordComplexity: passwordComplexityHelper } = require('@config-rgsl/application-user/lib/PasswordValidationHelperImpl');

/**
 * @errorCode {errorCode} PasswordMandatory, PasswordLength, PasswordComplexityRules, PasswordUsername, PasswordSimpleSequences, PasswordCyrillicCharacter
 */
module.exports = function passwordComplexity(input) {
    const { isNewUser, password, username, claims } = input;

    const dataPath = this.businessContext.dataPath;

    if (isNewUser && !password) {
        return {
            errorCode: 'PasswordMandatory',
            errorMessage: 'Password is mandatory!',
            errorDataPath: dataPath,
        };
    }

    if (!password) {
        return;
    }

    return passwordComplexityHelper(password, dataPath, claims.AccountType, username);
};
