'use strict';

const { originatingClientIds } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { accCertificateIncomingSource } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getCertificateSource } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function mapping(input) {
    const bc = this.businessContext;
    const body = bc?.rootData;
    const configurationCodeName = 'AccountingCertificate';
    const configurationVersion = '1';
    const currentCertificateNumber = bc?.documentNumber ?? "";
    const originatingClientId = this.applicationContext?.originatingClientId;
    const originatingUserName = this.applicationContext?.originatingUser?.username;
    const sequenceNumber = bc.sequenceNumber;
    const currentSource = body.accountingCertificateIncomeSource;
    const incomingSource = currentSource ? currentSource : getCertificateSource(originatingClientId, originatingUserName);

    const output = {
        body,
        configurationCodeName,
        configurationVersion,
        currentCertificateNumber,
        incomingSource,
        sequenceNumber
    };

    return output;
};
