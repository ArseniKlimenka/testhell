'use strict';

const { parseHighlightedErrorMessage } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onChangeInsuredPerson(input, ambientProperties) {

    const selectedInsuredPersonArr = input.context.Body.technicalInformation.availableInsuredPersons.filter(i => i.personCode == input.data.personCode);
    if (selectedInsuredPersonArr?.length > 0) {

        input.context.Body.insuredPerson = selectedInsuredPersonArr[0];
        try {
            await this.view.evaluate(['/accountingCertificateEnrichments'], false, true);
        } catch (error) {
            throw new Error(parseHighlightedErrorMessage(error.error.StackTrace));
        }
    }
    else {

        input.context.Body.insuredPerson = {};
    }
};
