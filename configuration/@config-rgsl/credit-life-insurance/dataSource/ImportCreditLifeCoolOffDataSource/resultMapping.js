const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    // called from route, but we need to provire RU translations
    this.applicationContext.locale = "ru-RU";

    const mapped = {
        bankBic: nullCheck(input.bankBic),
        bankAccountNumber: nullCheck(input.bankAccountNumber),
        policySeries: nullCheck(input.policySeries),
        policyNumber: nullCheck(input.policyNumber),
        applicationSignDate: nullCheck(input.applicationSignDate)
    };

    return {
        data: mapped,
        $recordKey: `${input.$rowNumber}`
    };

};
