module.exports = function mapping(importDocument) {

    const ret = {
        importSources: [
            {
                sourceId: `AccountingCertificateImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
                dataSource: {
                    name: 'AccountingCertificateImportDataSource',
                    input: {
                        data: {
                            fileId: importDocument.file.fileId
                        }
                    }
                }
            }
        ]
    };

    return ret;
};
