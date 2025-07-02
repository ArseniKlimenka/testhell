const { commissionActStatusCode } = require('@config-rgsl/acc-base/lib/actConsts');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function setStatusOnSelection(input, ambientProperties) {
    let newStatus = undefined;
    const items = input.context.selection;
    const oldStatus = items[0].resultData.actStateCode;
    let allowedStatusesTo;
    switch (oldStatus) {
        case commissionActStatusCode.DRAFT: {
            allowedStatusesTo = [ commissionActStatusCode.DELETED, commissionActStatusCode.CONFIRMING];
            break;
        }
        case commissionActStatusCode.CONFIRMING: {
            allowedStatusesTo = [ commissionActStatusCode.CONFIRMED];
            break;
        }
        case commissionActStatusCode.CONFIRMED: {
            allowedStatusesTo = [ commissionActStatusCode.APPROVED];
            break;
        }
    }

    if (!allowedStatusesTo) {
        return;
    } else if (allowedStatusesTo.length === 1) {
        newStatus = allowedStatusesTo[0];
    } else {
        const result = await showDialog(allowedStatusesTo, ambientProperties);
        if (result.actStateCode) {
            newStatus = result.actStateCode;
        }
    }

    if (newStatus)
    {
        this.view.startBlockingUI();
        for (const act of items) {
            await setActStatus(act.resultData.actNo, act.resultData.eTag, newStatus, this.view, ambientProperties);
        }
        this.view.stopBlockingUI();
    }
};

async function showDialog(allowedStatuses, ambientProperties) {
    const viewDialogService = ambientProperties.services.viewDialog;

    const customData = {
        actStateCodes: allowedStatuses,
    };

    const dialogViewReference = {
        configurationCodeName: 'SelectActStatusView',
        configurationConceptType: 'SearchView',
        configurationVersion: '1'
    };

    const dialogParams = {
        dialogViewReference,
        customData,
        dialogSize: 'small',
        onLoad: 'hideDialogButtons',
    };

    return await viewDialogService.show(dialogParams);
}

/**
 * @translationKey {translationKey} StatusChanged
 */

async function setActStatus(actNo, eTag, newStateCode, view, ambientProperties) {

    let transitionName;
    switch (newStateCode) {
        case commissionActStatusCode.DELETED: {
            transitionName = 'Draft_To_Deleted';
            break;
        }
        case commissionActStatusCode.CONFIRMING: {
            transitionName = 'Draft_To_Confirming';
            break;
        }
        case commissionActStatusCode.DRAFT: {
            transitionName = 'Confirming_To_Draft';
            break;
        }
        case commissionActStatusCode.CONFIRMED: {
            transitionName = 'Confirming_To_Confirmed';
            break;
        }
        case commissionActStatusCode.APPROVED: {
            transitionName = 'Confirmed_To_Approved';
            break;
        }
    }

    if (!transitionName) {
        return;
    }

    const request = {
        method: 'post',
        url: `api/core/universal-documents/CommissionAct/1/${actNo}/transitions/${transitionName}`,
        data: {
            data: {}
        },
        callContext: {
            workUnitActorCode: ambientProperties.currentWorkUnitActor
        },
        headers: {
            'If-Match': '"' + eTag.toLowerCase() + '"'
        },
    };

    let result;
    try {
        view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        view.stopBlockingUI();
    }

    const ONLY_OK_BUTTON = 1;
    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.StatusChanged', 'OK', 'Cancel', ONLY_OK_BUTTON);
    view.reloadEntity();
}
