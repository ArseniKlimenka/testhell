'use strict';

const { sendVerificationEmail } = require('@config-rgsl/life-insurance/lib/ePolicyVerificationHelper');

module.exports = async function resendSignedContract(input, ambientProperties) {

    this.view.startBlockingUI();

    await sendVerificationEmail(input, ambientProperties, true, this.view).catch(error => {
        this.view.stopBlockingUI();
        throw error.message;
    });

    ambientProperties.services.confirmationDialog.showConfirmation('Документы отправлены', 'OK', 'OK', 2);
    this.view.stopBlockingUI();
};

