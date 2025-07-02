'use strict';

const { sourceFileFormatRateOfReturnRulesDataConstants } = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesHelper');

module.exports = function mapping(importDocument) {
    let dataSourceName = ``;
    const sourceFileFormatData = sourceFileFormatRateOfReturnRulesDataConstants.find(_ => _.fileFormat === importDocument.sourceFileFormat);
    if (sourceFileFormatData) {
        dataSourceName = sourceFileFormatData.dataSourceName;
    }

    return {
        importSources: [
            {
                sourceId: `RateOfReturnRulesImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
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
