'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { setAllFinKnowledgeQuestionnaires } = require('@config-rgsl/party/lib/partyQuestionnairesHelper');
const { checkContractors, checkParty } = require('@config-rgsl/party/lib/naturalPersonHelper');

/**
 * @translationKey {translationKey} PartyIsParticipant
 */

module.exports = async function beforeSave(input, ambientProperties) {

    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const checkKpkRoleCode = 'checkKPKForced';
    const generalBackOfficeRoleCode = 'GeneralBackOffice';

    const currentDate = DateTimeUtils.dateNow();
    input.context.Body.partyGeneralData.lastUpdateDate = currentDate;

    setAllFinKnowledgeQuestionnaires(input);

    if (userRoles.find(x => x.ApplicationRoleCodeName === checkKpkRoleCode)) {

        if (!input.context?.Code) {
            input.rootContext.ClientViewModel.isCheckKpkAfterSave = true;
            return;
        }

        await checkContractors(input, ambientProperties, this.view);
    }

    const isGeneralBackOffice = userRoles.some(x => x.ApplicationRoleCodeName === generalBackOfficeRoleCode);
    const hasForeignAddress = input.context.Body.partyAddresses.some(address => address.isForeignAddress);

    if (!isGeneralBackOffice && hasForeignAddress) {
        const partyCode = input.context?.Code;

        if (!partyCode) {
            return;
        }
        const contracts = await checkParty(partyCode, ambientProperties);

        if (contracts.data.length > 0) {
            ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.PartyIsParticipant', "OK", "Cancel", 1);
            return false;
        }
    }
};
