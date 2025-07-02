'use strict';

const { updateClientViewModel } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = async function onChangeAccountingYear(input, ambientProperties) {

    updateClientViewModel(input, this.view);
    this.view.setDirty();
};
