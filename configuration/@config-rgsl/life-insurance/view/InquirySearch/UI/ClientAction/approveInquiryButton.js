'use strict';

module.exports = async function approveInquiryButton(input, ambientProperties) {

    const selectedInquiryNumbersDraft = input.context?.selection?.filter(i => i.resultData.inquiryState == 'Draft');
    const selectedInquiryNumbersNotDraft = input.context?.selection?.filter(i => i.resultData.inquiryState != 'Draft').map(i => i.resultData.inquiryNumber);
    const selectedInquiryNumbersExceptEndowment = selectedInquiryNumbersDraft?.filter(i => i.resultData.inquiryCodeName != 'EndowmentInquiry').map(i => {
        return {
            inquiryNumber: i.resultData.inquiryNumber,
            inquiryCodeName: i.resultData.inquiryCodeName
        };
    });
    const selectedInquiryNumbersOnlyEndowment = selectedInquiryNumbersDraft?.filter(i => i.resultData.inquiryCodeName == 'EndowmentInquiry').map(i => {
        return {
            inquiryNumber: i.resultData.inquiryNumber,
            inquiryCodeName: i.resultData.inquiryCodeName
        };
    });

    if (selectedInquiryNumbersExceptEndowment?.length > 0) {
        const request = getApproveInquiryETLServiceRequest('ApproveInquiryETLService', selectedInquiryNumbersExceptEndowment);

        await ambientProperties.services.api.call(request);
    }

    if (selectedInquiryNumbersOnlyEndowment?.length > 0) {
        const request = getApproveInquiryETLServiceRequest('ApproveInquiryEndowmentETLService', selectedInquiryNumbersOnlyEndowment);

        await ambientProperties.services.api.call(request);
    }

    if (selectedInquiryNumbersNotDraft?.length > 0) {
        ambientProperties.services.confirmationDialog.showNotification(
            `Запросы: ${selectedInquiryNumbersNotDraft.toString()} не будут обработаны, т.к. находятся в статусе отличного от «Создан»`,
            'OK',
            'Cancel',
            1);
    }

};

function getApproveInquiryETLServiceRequest(approveInquiryETLService, selectedInquiryNumbers) {
    return {
        method: 'post',
        url: `api/core/shared/etl-services/${approveInquiryETLService}/1`,
        data: {
            data: {
                universalDocumentNumbers: selectedInquiryNumbers
            }
        },
        returnHttpPromise: true
    };
}
