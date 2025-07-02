'use strict';

const { sourceFileFormatFundAssetsDataConstants } = require('@config-rgsl/life-insurance/lib/fundAssetsHelper');

module.exports = function mapping(importDocument) {
    let dataSourceName = ``;
    const sourceFileFormatData = sourceFileFormatFundAssetsDataConstants.find(_ => _.fileFormat === importDocument.sourceFileFormat);
    if (sourceFileFormatData) {
        dataSourceName = sourceFileFormatData.dataSourceName;
    }

    return {
        importSources: [
            {
                sourceId: `FundAssetsImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
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
