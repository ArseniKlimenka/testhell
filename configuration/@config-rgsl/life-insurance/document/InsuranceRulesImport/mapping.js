'use strict';

module.exports = function mapping(importDocument) {
    let dataSourceName = ``;
    const sourceFileFormatInsuranceRulesDataConstants = [
        {
            "fileFormat": 1,
            "formatName": "Excel",
            "dataSourceName": "InsuranceRulesXlsxFileLoaderDataSource"
        }
    ];

    const sourceFileFormatData = sourceFileFormatInsuranceRulesDataConstants.find(_ => _.fileFormat === importDocument.sourceFileFormat);
    if (sourceFileFormatData) {
        dataSourceName = sourceFileFormatData.dataSourceName;
    }

    return {
        importSources: [
            {
                sourceId: `InsuranceRulesImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
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
