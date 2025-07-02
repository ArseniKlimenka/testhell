'use strict';

module.exports = function onSelectionChanged(input, ambientProperties) {

    if (input.context.viewContext.userToAssignChanged) {

        const selectionBeforeUserToAssignWasSelected = input?.context?.selection ?? [];

        this.view.getControlByElementId('activitiesTableVerificationId')?.dataSource?.selectionModel?.select(selectionBeforeUserToAssignWasSelected);

        input.context.viewContext.userToAssignChanged = false;
    }

};
