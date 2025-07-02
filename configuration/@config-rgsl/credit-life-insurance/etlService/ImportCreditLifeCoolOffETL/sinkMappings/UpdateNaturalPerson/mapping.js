const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(lineInput, sinkExchange) {

    // called from route, but we need to provide RU translations
    this.applicationContext.locale = "ru-RU";

    const lineData = lineInput.data;
    const bankBic = lineData.bankBic;
    const bankAccountNumber = lineData.bankAccountNumber;
    const body = getValue(sinkExchange, 'party.body');
    const partyBankAccounts = getValue(body, 'partyBankAccounts', []);

    if (partyBankAccounts.some(item => item.number == bankAccountNumber)) {
        const relatedBankAccount = partyBankAccounts.find(item => item.number == bankAccountNumber);
        if (!relatedBankAccount.closingDate) {
            if (relatedBankAccount.bankBic != bankBic) {
                throw 'Необходимо скорректировать БИК и/или корр. счет на карточке контрагента - данные не совпадают';
            }
        }
        else {
            throw 'Счет контрагента закрыт - необходимо скорректировать карточку контрагента';
        }
    }
    else {
        if (partyBankAccounts.some(item => item.bankBic == bankBic && !item.closingDate)) {
            partyBankAccounts
                .find(item => item.bankBic == bankBic && !item.closingDate)
                .closingDate = DateTimeUtils.substractDays(DateTimeUtils.dateNow(), 1);
            partyBankAccounts.push({
                bankBic: bankBic,
                number: bankAccountNumber,
                openingDate: DateTimeUtils.dateNow()
            });
        }
        else {
            partyBankAccounts.push({
                bankBic: bankBic,
                number: bankAccountNumber
            });
        }
    }

    return {
        body: body,
        code: getValue(sinkExchange, 'party.code'),
        enrichFields: [
            "/**"
        ]
    };

};
