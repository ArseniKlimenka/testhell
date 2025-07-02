'use strict';

const { sourceFileFormatFundDataConstants } = require('@config-rgsl/life-insurance/lib/fundHelper');

module.exports = function mapping(importDocument) {
    let dataSourceName = ``;
    const sourceFileFormatData = sourceFileFormatFundDataConstants.find(_ => _.fileFormat === importDocument.sourceFileFormat);
    if (sourceFileFormatData) {
        dataSourceName = sourceFileFormatData.dataSourceName;
    }

    return {
        importSources: [
            {
                sourceId: `FundImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
                dataSource: {
                    name: dataSourceName,
                    input: {
                        data: {
                            fileId: importDocument.file.fileId,
                            reportDate: importDocument.reportDate
                        }
                    }
                }
            }
        ]
    };
};
