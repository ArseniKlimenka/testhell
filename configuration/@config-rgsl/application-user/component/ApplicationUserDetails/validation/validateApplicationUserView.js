const PasswordValidationConstants = require('@config-rgsl/application-user/lib/PasswordValidationConstants');

/**
* @errorCode {errorCode} commonPaswordRequirements1
* @errorCode {errorCode} commonPaswordRequirements2
* @errorCode {errorCode} commonPaswordRequirements3
* @errorCode {errorCode} commonPaswordRequirements4
* @errorCode {errorCode} commonPaswordRequirements5
* @errorCode {errorCode} commonPaswordRequirements6
* @errorCode {errorCode} commonPaswordRequirements7
* @errorCode {errorCode} commonPaswordRequirements8
* @errorCode {errorCode} commonPaswordRequirements9
*/

module.exports = function validateApplicationUserView(input) {

    const accountType = input?.accountType || input?.claims?.AccountType;
    const minLength = accountType ? PasswordValidationConstants.minLength[accountType] : PasswordValidationConstants.minLengthDefault;

    return [
        {
            errorCode: 'commonPaswordRequirements1',
            severity: 'Note',
            reference: {
                entity: {
                    minLength: minLength
                }
            }
        },
        {
            errorCode: 'commonPaswordRequirements2',
            severity: 'Note'
        },
        {
            errorCode: 'commonPaswordRequirements3',
            severity: 'Note'
        },
        {
            errorCode: 'commonPaswordRequirements4',
            severity: 'Note'
        },
        {
            errorCode: 'commonPaswordRequirements5',
            severity: 'Note'
        },
        {
            errorCode: 'commonPaswordRequirements6',
            severity: 'Note'
        },
        {
            errorCode: 'commonPaswordRequirements7',
            severity: 'Note'
        },
        {
            errorCode: 'commonPaswordRequirements8',
            severity: 'Note'
        },
        {
            errorCode: 'commonPaswordRequirements9',
            severity: 'Note'
        }
    ];

};
