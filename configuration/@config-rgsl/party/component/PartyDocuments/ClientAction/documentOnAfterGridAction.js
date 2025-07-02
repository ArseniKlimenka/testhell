'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function documentOnAfterGridAction(input, ambientProperties) {

    const allDocuments = input.componentContext;

    allDocuments.sort((a, b) => {

        // sort by docTypeCode
        if (a.docType.docTypeCode > b.docType.docTypeCode) { return -1; }
        if (a.docType.docTypeCode < b.docType.docTypeCode) { return 1; }

        // sort by issueDate
        if (a.issueDate > b.issueDate) { return -1; }
        if (a.issueDate < b.issueDate) { return 1; }

    });

    allDocuments.forEach(function (item, idx, arr) {

        // check first item
        if (idx == 0) { return; }

        // set expireDate as next one issueDate -1 day
        if (item.docType.docTypeCode == arr[idx - 1].docType.docTypeCode) {
            item.expireDate = DateTimeUtils.addDays(arr[idx - 1].issueDate, -1);
        }

    });
};
