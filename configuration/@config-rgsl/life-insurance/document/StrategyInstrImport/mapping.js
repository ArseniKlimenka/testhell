'use strict';

const { sourceFileFormatStrategyInstrDataConstants } = require('@config-rgsl/life-insurance/lib/strategyInstrHelper');

module.exports = function mapping(importDocument) {
    let dataSourceName = ``;
    const sourceFileFormatData = sourceFileFormatStrategyInstrDataConstants.find(_ => _.fileFormat === importDocument.sourceFileFormat);
    if (sourceFileFormatData) {
        dataSourceName = sourceFileFormatData.dataSourceName;
    }

    return {
        importSources: [
            {
                sourceId: `StrategyInstrImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
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
