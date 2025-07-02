module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    if (input.context.ConfigurationCodeName == 'Claim') {

        currentView.setSearchRequest({
            data: {
                criteria: {
                    mainContractNo: input.context.Body.mainAttributes.contract.number,
                    enableGrouping: true,
                }
            }
        });
        currentView.setProtectedFields(['mainContractNo'], true);

    } else if (input.context.ConfigurationCodeName == 'CommissionActRgslView') {

        currentView.setSearchRequest({
            data: {
                criteria: {
                    actId: input.rootContext.Body.actId,
                    enableGrouping: true,
                }
            }
        });
        currentView.setProtectedFields(['actId'], true);

    } else if (input.context.ConfigurationCodeName == 'BankStatementItemRgslView') {

        currentView.setSearchRequest({
            data: {
                criteria: {
                    bankStatementItemId: input.componentContext.bankStatementItemId,
                    enableGrouping: true,
                }
            }
        });
        currentView.setProtectedFields(['bankStatementItemId'], true);

    } else if (input.context.ConfigurationCodeName == 'CommissionAct') {

        currentView.setSearchRequest({
            data: {
                criteria: {
                    actNo: input.rootContext.Number,
                    enableGrouping: true,
                }
            }
        });
        currentView.setProtectedFields(['actNo'], true);

    } else {

        currentView.setSearchRequest({
            data: {
                criteria: {
                    mainContractNo: input.rootContext.Number,
                    enableGrouping: true,
                }
            }
        });
        currentView.setProtectedFields(['mainContractNo'], true);

    }

    currentView.search();
};
