module.exports = function mapping(importDocument) {

    const ret = {
        importSources: [
            {
                sourceId: `UsersExcelImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
                dataSource: {
                    name: 'ExcelUserDataSource',
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
