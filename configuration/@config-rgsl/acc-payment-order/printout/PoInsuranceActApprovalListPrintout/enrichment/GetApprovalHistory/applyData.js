const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');
const { amountConsts, transitions } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const transitionsToInclude = [
            transitions.claimManagerToClaimDirector,
            transitions.legalToClaimManager,
            transitions.securityToClaimManager,
            transitions.claimDirectorToSentToPayment,
            transitions.claimDirectorToMethodologyDirector,
            transitions.methodologyDirectorToSentToPayment
        ];

        let items = dataSourceResponse.data.map(item => item.resultData);
        items = items.filter(item => transitionsToInclude.includes(item.transitionName));
        validateItems(items, input);

        items.sort(function (a, b) { return new Date(a.approvedOnDateTime) - new Date(b.approvedOnDateTime); });

        const result = [];

        items.forEach(item => {

            const printItem = getItemForPrint(item, items, input);

            if (printItem) {

                result.push(printItem);
            }
        });

        input.tableRows = result.join("");
    }
};

function validateItems(records, inputData) {

    const securityApproval = records.find(rec => rec.transitionName === transitions.securityToClaimManager);

    if (securityApproval && inputData.claimAmount <= amountConsts.legalAndSecurityApproval) {

        const index = records.indexOf(securityApproval);
        records.splice(index, 1);
    }

    const legalApproval = records.find(rec => rec.transitionName === transitions.legalToClaimManager);

    if (legalApproval && inputData.claimAmount <= amountConsts.legalAndSecurityApproval) {

        const index = records.indexOf(legalApproval);
        records.splice(index, 1);
    }

    const directorApproval = records.find(rec => rec.transitionName === transitions.claimDirectorToSentToPayment);
    const methodologyApproval = records.find(rec => rec.transitionName === transitions.claimDirectorToMethodologyDirector);

    if (directorApproval && methodologyApproval) {

        const index = records.indexOf(methodologyApproval);
        records.splice(index, 1);
    }
}

function getItemForPrint(item, array, inputData) {

    let comment = '';

    if (item.transitionName === transitions.legalToClaimManager) {

        comment = inputData.legalConclusion;
    }
    else if (item.transitionName === transitions.securityToClaimManager) {

        comment = inputData.securityConclusion;
    }

    return `<tr><td>${array.indexOf(item) + 1}</td><td>${item.approvalGroupName}</td><td>${item.approvedBy}</td><td>${printoutUtils.formatDatePrint(item.approvedOnDate)}</td><td>Согласовано</td><td>${comment}</td></tr>`;
}
