'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

const {
    checkBeforeSaveAttributes,
    showDuplicatesMessage,
    getDuplicatesInformation
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = async function AccountingCertificateBeforeSave(input, ambientProperties) {

    const loaderId = this.view.startPriorityBlockingUI();
    try {
        if (input.context.Body?.contract?.number) {

            input.rootContext.ClientViewModel.isContractEnrichOnly = false;
        }
        else {

            input.rootContext.ClientViewModel.isContractEnrichOnly = true;
        }

        const isRequiredAttributesFilled = await checkBeforeSaveAttributes(input, ambientProperties, this);

        if (!isRequiredAttributesFilled) {
            return false;
        }

        const duplicates = await getDuplicatesInformation(input, ambientProperties, this);

        const isDuplicates = await showDuplicatesMessage(duplicates, input, ambientProperties, this);

        if (isDuplicates) {
            return false;
        }

        checkCounterpartyPartyCodes(input);
        await evaluateAccountingCertificate(input, ambientProperties, this);
    }
    finally {
        this.view.stopPriorityBlockingUI(loaderId);
    }
};

async function evaluateAccountingCertificate(input, ambientProperties, self) {

    await self.view.evaluate(['/accountingCertificateEnrichments'], false, true);

    self.view.rebind();
    self.view.reevaluateRules();
    self.view.validate();
}

function checkCounterpartyPartyCodes(input) {

    input.context.Body.insuredPersonData.isTaxPayerInsuredPerson = input.context.Body.insuredPersonData.partyCode === input.context.Body.taxPayerData.partyCode;
}
