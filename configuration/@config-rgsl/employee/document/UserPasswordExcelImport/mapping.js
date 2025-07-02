module.exports = function mapping(importDocument) {

    const ret = {
        importSources: [
            {
                sourceId: `UserPasswordExcelImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
                dataSource: {
                    name: 'ExcelUserPasswordDataSource',
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
