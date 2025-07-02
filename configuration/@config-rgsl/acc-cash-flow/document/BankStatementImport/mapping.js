const { sourceFileFormatBsiDataConstants } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');

module.exports = function mapping(importDocument) {
    let dataSourceName = ``;
    const sourceFileFormatData = sourceFileFormatBsiDataConstants.find(_ => _.fileFormat === importDocument.sourceFileFormat);
    if (sourceFileFormatData) {
        dataSourceName = sourceFileFormatData.dataSourceName;
    }

    return {
        importSources: [
            {
                sourceId: `BankStatementImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
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
