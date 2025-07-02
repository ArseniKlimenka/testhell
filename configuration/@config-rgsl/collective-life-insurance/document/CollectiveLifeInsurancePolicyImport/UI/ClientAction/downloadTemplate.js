'use strict';

module.exports = function downloadTemplate(input, ambientProperties) {

    const fileId = input.context.Body.template.fileId;

    downloadFile(fileId, ambientProperties);
};

async function downloadFile(fileId, ambientProperties) {

    const request = prepareRequest(fileId);

    const response = await ambientProperties.services.api.call(request);

    let fileUrl;
    let downloadLink;
    const contentDisposition = response.headers.get('Content-Disposition');
    const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim().replace(/"/g, '');

    try {
        fileUrl = window.URL.createObjectURL(response.body);
        downloadLink = document.createElement('a');
        downloadLink.style = 'display: none';
        downloadLink.href = fileUrl;
        downloadLink.download = decodeURIComponent(filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    finally {
        if (downloadLink) {
            document.body.removeChild(downloadLink);
        }
        if (fileUrl) {
            window.URL.revokeObjectURL(fileUrl);
        }
    }
}

function prepareRequest(fileId) {

    return {
        method: 'get',
        url: `api/document-management/files/${fileId}`,
        throwException: true,
        responseType: 'blob',
        returnFullResponse: true,
        callContext: {
            workUnitActorCode: 'System'
        }
    };
}
