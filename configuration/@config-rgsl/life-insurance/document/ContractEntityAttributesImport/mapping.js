'use strict';

const { contractEntityAttributesDataSources } = require('@config-rgsl/life-insurance/lib/contractEntityAttributesImportHelper');

module.exports = function mapping(importDocument) {
    let dataSourceName = ``;
    const sourceFileFormatData = contractEntityAttributesDataSources.find(_ => _.attributeType === importDocument.attributeType);
    if (sourceFileFormatData) {
        dataSourceName = sourceFileFormatData.dataSourceName;
    }

    return {
        importSources: [
            {
                sourceId: `ContractEntityAttributesImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
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
