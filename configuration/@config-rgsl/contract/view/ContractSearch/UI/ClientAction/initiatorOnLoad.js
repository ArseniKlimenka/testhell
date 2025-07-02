'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = async function initiatorOnLoad(input, ambientProperties) {

    this.getLookup().getContext().viewContext.lockServiceProviderType = true;
    this.getLookup().getContext().viewContext.lockOrganisationUnit = true;
    this.getLookup().setProtectedFields([
        'serviceProviderType',
        'organisationUnitCode',
        'organisationUnitCodes',
        'includeChildren',
        'isPersonalManager'
    ]);

    const organisationUnitCodesCriteria = getValue(input, 'context.request.data.criteria.organisationUnitCodes', []);
    const organisationUnitCodeCriteria = getValue(input, 'context.request.data.criteria.organisationUnitCode', undefined);
    const organisationUnitNameCriteria = getValue(input, 'context.request.data.criteria.organisationUnitName', undefined);
    const includeChildrenCriteria = getValue(input, 'context.request.data.criteria.includeChildren', false);
    const isPersonalManagerCriteria = getValue(input, 'context.request.data.criteria.isPersonalManager', false);

    this.getLookup().setSearchRequest({
        data: {
            criteria: {
                serviceProviderType: "Employee",
                organisationUnitCode: organisationUnitCodeCriteria,
                organisationUnitName: organisationUnitNameCriteria,
                organisationUnitCodes: organisationUnitCodesCriteria,
                includeChildren: includeChildrenCriteria,
                isPersonalManager: isPersonalManagerCriteria
            }
        }
    });

    this.getLookup().search();

};
