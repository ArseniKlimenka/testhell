const { codeTableItems } = require('@adinsure/runtime');

module.exports = function mapping(importDocument) {
    const bsiRegistryType = codeTableItems.getCodeTableItem('BsiRegistryType', importDocument.sourceFileFormat);
    const dataSourceName = bsiRegistryType.dataSourceName;

    return {
        importSources: [
            {
                sourceId: `AggregatedPaymentRegisterImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
                dataSource: {
                    name: dataSourceName,
                    input: {
                        data: {
                            fileId: importDocument.file.fileId
                        }
                    }
                }
            }
        ]
    };
};
