'use strict';

function getTextAttachment(attachmentType) {
    return {
        filePath: '../../../../configuration/@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachments/attachmentFile.txt',
        metadataRaw: {
            'fileName': 'attachmentFile.txt',
            'mediaType': 'text/plain',
            'attachmentType': attachmentType,
            'name': 'Attachment',
            'attachmentDescription': 'The attachment',
            'receiptDate': '01.09.2018',
        },
    };
}
function getAttachments() {
    return {
        passport: {
            filePath: '../../../../configuration/@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachments/passport.txt',
            metadataRaw: {
                'fileName': 'passport.txt',
                'mediaType': 'text/plain',
                'attachmentType': 'passport',
                'name': 'Identification document',
                'attachmentDescription': 'Personal ID',
                'receiptDate': '01.09.2018',
            },
        },
        contractSigned: {
            filePath: '../../../../configuration/@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachments/contractSigned.txt',
            metadataRaw: {
                'fileName': 'contractSigned.txt',
                'mediaType': 'text/plain',
                'attachmentType': 'contractSigned',
                'name': 'Contract signed',
                'attachmentDescription': 'Contract signed',
                'receiptDate': '01.09.2018',
            },
        },
        bankNotification: {
            filePath: '../../../../configuration/@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachments/bankNotification.txt',
            metadataRaw: {
                'fileName': 'bankNotification.txt',
                'mediaType': 'text/plain',
                'attachmentType': 'bankNotification',
                'name': 'Bank notification document',
                'attachmentDescription': 'Bank notification document',
                'receiptDate': '01.09.2018',
            },
        },
        financialQuestionary: {
            filePath: '../../../../configuration/@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachments/financialQuestionary.txt',
            metadataRaw: {
                'fileName': 'financialQuestionary.txt',
                'mediaType': 'text/plain',
                'attachmentType': 'financialQuestionary',
                'name': 'Financial questionary',
                'attachmentDescription': 'Financial questionary',
                'receiptDate': '01.09.2018',
            },
        },
        claim: {
            edowmentApplication: {
                filePath: '../../../../configuration/@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachments/attachmentFile.txt',
                metadataRaw: {
                    'fileName': 'attachmentFile.txt',
                    'mediaType': 'text/plain',
                    'attachmentType': 'edowmentApplication',
                    'name': 'Edowment application',
                    'attachmentDescription': 'Edowment application',
                    'receiptDate': '01.09.2018',
                },
            },
            insuredAliveConfirmation: {
                filePath: '../../../../configuration/@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachments/attachmentFile.txt',
                metadataRaw: {
                    'fileName': 'attachmentFile.txt',
                    'mediaType': 'text/plain',
                    'attachmentType': 'insuredAliveConfirmation',
                    'name': 'Insured alive confirmation',
                    'attachmentDescription': 'Insured alive confirmation',
                    'receiptDate': '01.09.2018',
                },
            },
            paymentRecipientPassport: {
                filePath: '../../../../configuration/@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachments/attachmentFile.txt',
                metadataRaw: {
                    'fileName': 'attachmentFile.txt',
                    'mediaType': 'text/plain',
                    'attachmentType': 'paymentRecipientPassport',
                    'name': 'Payment recipient passport',
                    'attachmentDescription': 'Payment recipient passport',
                    'receiptDate': '01.09.2018',
                },
            },
        },
    };
}

module.exports = {
    getTextAttachment,
    getAttachments,
};
