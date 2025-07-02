'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function refreshOrganisationData(input, ambientProperties) {

    const headOrgUnitCode = input.componentContext.organisationUnit?.code;

    if (!headOrgUnitCode) {

        return;
    }

    const requestOrgUnitCodeParent = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/OrganisationUnitsImplDataSource',
        data: {
            data: {
                criteria: {
                    orgUnitCode: headOrgUnitCode
                }
            }
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(requestOrgUnitCodeParent);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    let headOrgUnitName = input.componentContext.organisationUnit.name;

    if (result.data && result.data.length > 0) {

        headOrgUnitName = result.data[0].resultData.name;
    }

    input.componentContext.organisationUnit.name = headOrgUnitName;

    this.rebindComponent();
    this.view.stopBlockingUI();
    ambientProperties.services.confirmationDialog.showConfirmation('Данные обновлены', 'OK', 'OK', 2);
};
