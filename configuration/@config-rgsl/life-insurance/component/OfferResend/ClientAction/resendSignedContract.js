'use strict';

const { SendOfferInfoEmail } = require('@config-rgsl/life-insurance/lib/ePolicyVerificationHelper');

module.exports = async function resendSignedContract(input, ambientProperties) {

    this.view.startBlockingUI();

    await SendOfferInfoEmail(input, ambientProperties, false, this.view).catch(error => {
        this.view.stopBlockingUI();
        throw error.message;
    });

    ambientProperties.services.confirmationDialog.showConfirmation('Договор отправлен', 'OK', 'OK', 2);
    this.view.stopBlockingUI();
};
