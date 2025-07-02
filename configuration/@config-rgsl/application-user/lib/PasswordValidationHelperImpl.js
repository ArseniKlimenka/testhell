const PasswordValidationConstants = require('@config-rgsl/application-user/lib/PasswordValidationConstants');

/**
 * Returns an error code if password is invalid
 * * @param {*} password Password to validate.
 * * @param {*} errorDataPath FIeld on which the error gets reported.
 */
function passwordComplexity(password, errorDataPath, accountType, username) {
    if (!password) {
        return;
    }

    // check length
    let minLength;
    if (accountType) {
        minLength = PasswordValidationConstants.minLength[accountType];
    }
    else {
        minLength = PasswordValidationConstants.minLengthDefault;
    }

    if (password.length < minLength) {
        return {
            errorCode: 'PasswordLength',
            errorMessage: 'Wrong password length!',
            errorDataPath: errorDataPath,
            reference: {
                minLength: minLength
            }
        };
    }

    // check by regexp
    let numberOfUsedComplexityRules = 0;

    const lowerCaseCharacterRegex = new RegExp('[a-z]');
    const upperCaseCharacterRegex = new RegExp('[A-Z]');
    const digitRegex = new RegExp('[0-9]');
    const specialCharacterRegex = new RegExp('[-~!@#$%^&*_+=`|\\(){}[\\]:;"\'<>,.?/]');

    if (upperCaseCharacterRegex.test(password)) {
        numberOfUsedComplexityRules++;
    }

    if (lowerCaseCharacterRegex.test(password)) {
        numberOfUsedComplexityRules++;
    }

    if (digitRegex.test(password)) {
        numberOfUsedComplexityRules++;
    }

    if (specialCharacterRegex.test(password)) {
        numberOfUsedComplexityRules++;
    }

    if (numberOfUsedComplexityRules < 4) {
        return {
            errorCode: 'PasswordComplexityRules',
            errorMessage: 'Password does not follow complexity rules. Password must meet at least 3 out of the following 4 complexity rules: (at least 1 uppercase character, at least 1 lowercase character, at least 1 digit, at least 1 special character)',
            errorDataPath: errorDataPath,
        };
    }

    // check by username
    const splittedUsername = [];
    for (let i = 0; i < username.length - 3; i++) {
        splittedUsername.push(username.substring(i, i + 4));
    }
    let partOfUsernameExistsInPassword = false;
    for (let i = 0; i < splittedUsername.length; i++) {
        if (password.toLowerCase().indexOf(splittedUsername[i].toLowerCase()) > -1) {
            partOfUsernameExistsInPassword = true;
        }
    }

    if (password == username || partOfUsernameExistsInPassword) {
        return {
            errorCode: 'PasswordUsername',
            errorMessage: 'Password needs to be not the same as username!',
            errorDataPath: errorDataPath,
        };
    }

    // check by simple sequences
    const numbers = '1234567890123';
    const splittedNumbers = [];
    for (let i = 0; i < numbers.length - 3; i++) {
        splittedNumbers.push(numbers.substring(i, i + 4));
    }
    let partOfNumbersExistsInPassword = false;
    for (let i = 0; i < splittedNumbers.length; i++) {
        if (password.toLowerCase().indexOf(splittedNumbers[i].toLowerCase()) > -1) {
            partOfNumbersExistsInPassword = true;
        }
    }

    const alphabet = 'abcdefghijklmnopqrstuvwxyzabc';
    const splittedAlphabet = [];
    for (let i = 0; i < alphabet.length - 3; i++) {
        splittedAlphabet.push(alphabet.substring(i, i + 4));
    }
    let partOfAlphabetExistsInPassword = false;
    for (let i = 0; i < splittedAlphabet.length; i++) {
        if (password.toLowerCase().indexOf(splittedAlphabet[i].toLowerCase()) > -1) {
            partOfAlphabetExistsInPassword = true;
        }
    }

    if (partOfNumbersExistsInPassword || partOfAlphabetExistsInPassword) {
        return {
            errorCode: 'PasswordSimpleSequences',
            errorDataPath: errorDataPath,
        };
    }

    // check by regexp cyrillic
    const cyrillicCharacterRegex = new RegExp('[а-яА-Я]');
    if (cyrillicCharacterRegex.test(password)) {
        return {
            errorCode: 'PasswordCyrillicCharacter',
            errorDataPath: errorDataPath,
        };
    }

}

/**
 * Returns an error if provided password strings do not match.
 * * @param {*} password1 First password to match against.
 * * @param {*} password2 Second password to match against.
 */
function passwordConfirmation(password1, password2) {
    if (password1 && password1 != password2) {
        return {
            errorCode: 'PasswordsDoNotMatch',
            errorMessage: 'Passwords do not match!'
        };
    }
}

module.exports = {
    passwordComplexity,
    passwordConfirmation
};
