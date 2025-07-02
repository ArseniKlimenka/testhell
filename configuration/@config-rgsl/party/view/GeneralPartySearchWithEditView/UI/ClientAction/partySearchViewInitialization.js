const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function partySearchViewInitialization(input, ambientProperties) {

    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const isWTTJ = userRoles.some(x => x.ApplicationRoleCodeName == 'WTTJ');

    copyLookupContextToPartySearchView(input.context, this.getCurrentView().getContext(), this.view);

    this.hideButtons();
    this.getViews()[1].showButton();
    this.getViews()[2].showButton();
    disableNonRelatedButtonsIfPartyTypeIsFixed(input.context, this, input.rootContext.ConfigurationCodeName);
    if (isWTTJ) {
        this.getCurrentView().search();
    }
};

function copyLookupContextToPartySearchView(context, viewData, view) {
    viewData.viewContext = context.viewContext;
    viewData.viewContext.showActions = true;
    context.request.paging = viewData.request.paging;
    viewData.request = context.request;

    // Safety check, because "rebind" causes "onViewInitialized" client action to be called again:
    if (!context.viewContext.isRebound) {
        view.rebind();
        context.viewContext.isRebound = true;
    }
}

function disableNonRelatedButtonsIfPartyTypeIsFixed(context, thisParam, configurationCodeName) {

    if (context.viewContext && context.viewContext.lockPartyType) {

        const partyTypeCriteria = context.request.data.criteria.partyType;
        thisParam.getCurrentView().setProtectedFields(['partyType'], true);

        if (partyTypeCriteria === partyType.NaturalPerson) { thisParam.getViews()[1].hideButton(); }


        if (partyTypeCriteria === partyType.LegalEntity) { thisParam.getViews()[2].hideButton(); }

    }

}
