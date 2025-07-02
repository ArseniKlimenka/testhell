'use strict';

module.exports = function mapDetailsGetInitViewModel(input) {

    const partyBankAccounts = input.Body.participants?.agent?.partyBody?.partyBankAccounts ?? [];

    if (partyBankAccounts?.length == 0) {
        input.Body.participants.agent.bankAccount = {};
    }

    return input;
};
