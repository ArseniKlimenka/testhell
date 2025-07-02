const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(lineInput, sinkExchange) {

    const partyCode = getExistingPartyCode(lineInput, sinkExchange);
    if (!partyCode) { return undefined; }

    return {
        input: {
            data: {
                criteria: {
                    partyCode
                }
            }
        }
    };
};

function getExistingPartyCode(lineInput, context) {

    if (context.parties.length == 0) { return undefined; }

    const firstName = getValue(lineInput, 'data.firstName', 'firstName').toLowerCase();
    const lastName = getValue(lineInput, 'data.lastName', 'lastName').toLowerCase();
    const middleName = getValue(lineInput, 'data.middleName', 'middleName').toLowerCase();

    const parties = context.parties.filter(x =>
        getValue(x, 'firstName', 'firstName').toLowerCase() == firstName &&
        getValue(x, 'lastName', 'lastName').toLowerCase() == lastName &&
        getValue(x, 'middleName', 'middleName').toLowerCase() == middleName &&
        x.dateOfBirth == lineInput.data.dateOfBirth);

    if (parties.length == 0) {
        throw new Error(`Существуют Контрагенты, которые имеют такие же паспортные данные! Коды контрагентов: ${context.parties.map(x => x.code)}.`);
    }

    const codes = parties.map(x => x.code);
    const sorted = codes.sort((a, b) => Number(a) > Number(b) ? 1 : -1);

    return sorted[0];
}
