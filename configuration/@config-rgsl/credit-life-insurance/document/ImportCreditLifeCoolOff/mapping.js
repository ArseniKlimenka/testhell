module.exports = function mapping(importDocument) {

    const ret = {
        importSources: [
            {
                sourceId: `ImportCreditLifePolicy:${importDocument.file.fileName}:${importDocument.file.fileId}`,
                dataSource: {
                    name: 'ImportCreditLifeCoolOffDataSource',
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
