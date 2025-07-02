'use strict';

module.exports = async function partyResultMapping(input, ambientProperties) {

    const componentContext = input.componentContext || {};
    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        const canUseParty = await canUsePartyCheck(selected.metadata.code, input.rootContext, ambientProperties);
        if (!canUseParty) {
            return;
        }

        componentContext.partyId = selected.metadata.entityId;
        componentContext.partyCode = selected.metadata.code;
        componentContext.partyType = selected.metadata.configurationName;
        componentContext.partyFullName = selected.resultData.fullName;
        this.view.save();
    }
};

async function canUsePartyCheck(partyCode, rootContext, ambientProperties) {

    if (ambientProperties.configurationCodeName == 'Employee') {

        const request = {
            method: "POST",
            url: `api/entity-infrastructure/shared/datasource/ServiceProviderDataSource`,
            data: {
                data: {
                    criteria: {
                        partyCode: partyCode,
                        serviceProviderType: "Employee"
                    }
                }
            }
        };

        return ambientProperties.services.api
            .call(request)
            .then(result => {

                if (!result.data || result.data.length == 0) { return true; }

                const filteredData = result.data.filter(item => item.metadata.entityId != rootContext.Id);
                if (filteredData.length == 0) {
                    return true;
                }

                const notificationMessage = "Уже есть сотрудник связанный с выбранным контрагентом!";
                ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
                return false;

            });

    }

    return true;

}
