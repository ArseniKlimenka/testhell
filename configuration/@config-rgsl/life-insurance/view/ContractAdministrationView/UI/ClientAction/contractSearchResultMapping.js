'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { getProductConfiguration } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');

module.exports = async function contractSearchResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        delete input.context.Body.orgUnit;
        delete input.context.Body.initiator;
        delete input.context.Body.productConfigurationVersion;
        delete input.context.Body.productCode;
        delete input.context.Body.issueDate;

        input.context.Body.contractNumber = lookupSelection[0].resultData.number;
        input.context.Body.contractType = lookupSelection[0].resultData.contractType;
        input.context.Body.contractPartnerCode = lookupSelection[0].resultData.partner.partnerCode;

        const productCode = lookupSelection[0].resultData.productCode;
        const issueDate = lookupSelection[0].resultData.issueDate;

        const searchCriteria = {};

        if (input.context.Body.contractPartnerCode) {

            searchCriteria.headPartnerCode = input.context.Body.contractPartnerCode;
        }
        else {

            searchCriteria.headPartnerCode = 'NONE';
        }

        const orgUnitRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/OrganisationUnitsImplDataSource',
            data: {
                data: {
                    criteria: searchCriteria,
                }
            }
        };

        let result;
        try {
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(orgUnitRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        const orgUnits = result.data.map((element) => {

            const result = {};
            result.displayName = element.resultData['name'];
            result.officeCode = element.resultData['officeCode'];

            const objValue = {};
            objValue.code = element.resultData['code'];
            objValue.description = element.resultData['name'];

            result.value = objValue;
            return result;
        });

        input.context.Body.availableOrgUnits = orgUnits;

        const productConfiguration = await getProductConfiguration(ambientProperties, productCode, issueDate);

        input.context.Body.productCode = productCode;
        input.context.Body.issueDate = issueDate;
        input.context.Body.productConfigurationVersion = productConfiguration?.version;
        input.context.Body.productConfigurationLastVersion = productConfiguration?.version;

    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
