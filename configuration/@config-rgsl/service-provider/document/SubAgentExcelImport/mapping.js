module.exports = function mapping(importDocument) {

    const ret = {
        importSources: [
            {
                sourceId: `SubAgentImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
                dataSource: {
                    name: 'ExcelSubAgentDataSource',
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
