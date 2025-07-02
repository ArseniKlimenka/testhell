'use strict';

module.exports = function initOrganisationUnitOverviewDetails(input, ambientProperties) {

    const { context } = input;
    const selection = context.selection;
    const currentViewContext = this.getCurrentView().getContext();

    if (selection && selection.length > 0) {
        const selected = selection[0].resultData;
        currentViewContext.viewContext.code = selected.code;
        currentViewContext.viewContext.name = selected.name;
    } else {
        currentViewContext.viewContext.code = undefined;
        currentViewContext.viewContext.name = undefined;
    }

    this.getCurrentView().rebind();

};
