const {
    userGroup,
} = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

const {
    AccountingCertificateDocNameConsts
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function allocate(input) {

    if (input.documentConfiguration.codeName === AccountingCertificateDocNameConsts.AccountingCertificate
        || input.documentConfiguration.codeName === AccountingCertificateDocNameConsts.AccountingCertificateCorrection
    ) {

        return allocateAccountingCertificate(input, this);
    }

    return null;
};

function allocateAccountingCertificate(input, that) {

    const stateCodeName = input.stateCodeName;
    const group = userGroup.UFO;
    const originatingUser = that.applicationContext?.originatingUser;
    const currentUsername = originatingUser?.username;

    const userGroups = originatingUser?.userGroups;
    const isUFO = userGroups.some(x => x.code === group);

    if (stateCodeName == 'Draft') {

        if (!isUFO) {
            return [{
                userGroup: group,
                assignAutomatically: false
            }];
        }

        return [{
            userGroup: group,
            username: currentUsername
        }];
    }

    return null;
}
