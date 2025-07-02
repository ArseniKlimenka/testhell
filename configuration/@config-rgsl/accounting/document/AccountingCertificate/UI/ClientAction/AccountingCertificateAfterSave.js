'use strict';

const { updateClientViewModel } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = async function AccountingCertificateAfterSave(input, ambientProperties) {

    const loaderId = this.view.startPriorityBlockingUI();
    try {
        await updateClientViewModel(input, this.view);
    }
    finally {
        this.view.stopPriorityBlockingUI(loaderId);
    }
};
