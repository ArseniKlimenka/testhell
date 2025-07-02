const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const FormatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

function toCalendarDate(value) {
    return DateTimeUtils.formatDate(value, DateTimeUtils.DateFormats.CALENDAR);
}

function toCalendarDateTime(value) {
    return DateTimeUtils.formatDate(value, 'dd.MM.yyyy HH:mm');
}

function toDocumentDate(value) {
    return FormatUtils.dateToStringDocumentationFormat(value);
}

async function getAgentName(spCode, ambientProperties) {
    const spRequest = {
        method: "post",
        url: "api/entity-infrastructure/shared/datasource/ServiceProviderPartyDataSource",
        data: {
            data: {
                criteria: {
                    serviceProviderCode: spCode,
                }
            }
        }
    };

    let spData = undefined;
    let agentName = undefined;

    const result = await ambientProperties.services.api.call(spRequest);
    spData = result?.data && result.data.length > 0 ? result.data : undefined;

    if (spData && spData.length == 1) {
        const spResultData = spData[0].resultData;
        if (spResultData.partyConfig.toString() === partyConstants.partyType.LegalEntity) {
            agentName = spResultData.shortName;
        }
        else {
            const fn = spResultData.firstName ? spResultData.firstName.charAt(0).toUpperCase() + '.' : '';
            const mn = spResultData.middleName ? spResultData.middleName.charAt(0).toUpperCase() + '.' : '';
            agentName = spResultData.lastName + fn + mn ;
        }
    }

    return agentName;
}

async function downloadFileById(fileId, fileName, ambientProperties) {
    const apiPath = 'api/document-management/public/files';
    const request = {
        method: 'get',
        url: `${apiPath}/${fileId}`,
        responseType: 'blob'
    };

    await ambientProperties.services.api.call(request).then(async (result) => {
        const fileUrl = window.URL.createObjectURL(result);
        const downloadLink = document.createElement('a');

        downloadLink.style = 'display: none';
        downloadLink.href = fileUrl;
        downloadLink.download = decodeURIComponent(fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        return;
    }).catch(err => {
        throwResponseError(err);
    });
}

module.exports = {
    toCalendarDate,
    toCalendarDateTime,
    toDocumentDate,
    getAgentName,
    downloadFileById,
};
