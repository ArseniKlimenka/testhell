const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');
const { amountConsts, endowmentTransitions } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const result = dataSourceResponse.data.map(r => r.resultData);
        const departmentCodes = [...new Set(result.map(r => r.departmentCodeName))];
        let latestInquiries = [];
        const tableRows = [];

        departmentCodes.forEach(code => {

            const inquiries = result.filter(r => r.departmentCodeName === code && (r.stateCode === 'Issued' || r.stateCode === 'Rejected'));
            const latestInquiry = getLatestDepartmentInquiry(inquiries, code);
            latestInquiries.push(latestInquiry);
        });

        latestInquiries = latestInquiries
            .sort(function (a, b) { return new Date(b.updatedOn).getTime() > new Date(a.updatedOn).getTime() ? -1 : 1; });

        latestInquiries.forEach(i => {

            const row = getItemForPrint(i, latestInquiries, input);
            tableRows.push(row);
        });

        input.tableRows = tableRows.join("");
    }
};

function getLatestDepartmentInquiry(inquiries, departmentCode) {

    const initialInquiries = inquiries ?? [];
    const filteredInquiries = initialInquiries.filter(i => i.departmentCodeName === departmentCode);
    const sortedInquiries = filteredInquiries
        .sort(function (a, b) { return new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime(); });

    return sortedInquiries[0];
}

function getItemForPrint(inquiry, inquiriesCollection, inputData) {

    return `<tr><td>${inquiriesCollection.indexOf(inquiry) + 1}</td><td>${inquiry.departmentCodeDescription}</td><td>${inquiry.changedByParty}</td><td>${printoutUtils.formatDatePrint(inquiry.changedOn)}</td><td>Согласовано</td><td>${inquiry.textOfComment ?? ''}</td></tr>`;
}
