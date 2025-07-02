'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.maxVersion = null;
    output.parameters.documentNumber = null;
    output.parameters.importDocumentId = null;
    output.parameters.confVersion = null;
    output.parameters.reportDate = null;
    output.parameters.reportDateVersion = null;
    output.parameters.maxReportDateVersion = null;
    output.parameters.isLatestReportDate = null;

    const criteria = input.data.criteria;

    if (criteria.maxVersion) {
        output.parameters.maxVersion = criteria.maxVersion;
    }

    if (criteria.documentNumber) {
        output.parameters.documentNumber = criteria.documentNumber;
    }

    if (criteria.importDocumentId) {
        output.parameters.importDocumentId = criteria.importDocumentId;
    }

    if (criteria.confVersion) {
        output.parameters.confVersion = criteria.confVersion;
    }

    if (criteria.reportDate) {
        output.parameters.reportDate = criteria.reportDate;
    }

    if (criteria.reportDateVersion) {
        output.parameters.reportDateVersion = criteria.reportDateVersion;
    }

    if (criteria.maxReportDateVersion) {
        output.parameters.maxReportDateVersion = criteria.maxReportDateVersion;
    }

    if (criteria.isLatestReportDate) {
        output.parameters.isLatestReportDate = criteria.isLatestReportDate;
    }

    output.sort = {
        EXCEL_ROW_NUMBER: 'asc'
    };

    return output;
};
