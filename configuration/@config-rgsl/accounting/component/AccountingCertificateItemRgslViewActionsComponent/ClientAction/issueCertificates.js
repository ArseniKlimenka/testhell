'use strict';

const {massIssue} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = async function issueCertificates(input, ambientProperties) {

    const isNeedAlert = false;

    await massIssue(input.context.selection, ambientProperties, this, isNeedAlert);
};
