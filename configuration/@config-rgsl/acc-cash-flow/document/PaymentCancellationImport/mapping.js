module.exports = function mapping(importDocument) {

    return {
        importSources: [
            {
                sourceId: `PaymentCancellationImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
                dataSource: {
                    name: 'PaymentCancellationFileLoader',
                    input: {
                        data: {
                            fileId: importDocument.file.fileId,
                        }
                    }
                }
            }
        ]
    };
};
