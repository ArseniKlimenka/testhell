'use strict';

module.exports = async function initiatorOnLoad(input) {

    this.getLookup().getContext().viewContext.lockServiceProviderType = true;
    this.getLookup().getContext().viewContext.lockOrganisationUnit = true;
    this.getLookup().setProtectedFields([
        'serviceProviderType',
        'organisationUnitCode',
        'organisationUnitCodes',
        'includeChildren',
        'isPersonalManager'
    ]);

    const organisationUnitCodesCriteria = input.context.request.data.criteria.organisationUnitCodes ?? [];
    const organisationUnitCodeCriteria = input.context.request.data.criteria.organisationUnitCode;
    const organisationUnitNameCriteria = input.context.request.data.criteria.organisationUnitName;
    const includeChildrenCriteria = input.context.request.data.criteria.includeChildren ?? false;
    const isPersonalManagerCriteria = input.context.request.data.criteria.isPersonalManager ?? false;

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
