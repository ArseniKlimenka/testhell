module.exports = function hidePersonOrganisationLookUpInputs(input, ambientProperties) {

    const isCollectivePolicy = input.rootContext.ConfigurationCodeName == 'CollectiveLifeInsurancePolicy';
    return isCollectivePolicy == false;
};
