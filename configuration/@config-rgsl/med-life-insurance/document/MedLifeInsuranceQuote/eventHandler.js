'use strict';

module.exports = function eventHandler(input) {

    const { event, document } = input;
    const senderDocument = event.senderDocument;
    if (senderDocument.configurationName == 'MedLifeInsurancePolicy') {
        if (event.eventType === 'Created') {
            return { makeTransition: (document.state + '_to_Issued') };
        }
    }
    return {};
};
