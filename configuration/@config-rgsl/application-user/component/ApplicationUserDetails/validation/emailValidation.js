const isEmailValid = require('@config-rgsl/party/lib/e-mailValidator');

/**
 * @errorCode {boolean}
 */
module.exports = function validateEmail(input) {
    return !input.Email || isEmailValid(input.Email);
};
