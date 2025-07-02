module.exports = function mapping(importDocument) {

    const ret = {
        importSources: [
            {
                sourceId: `UserActivityExcelImport:${importDocument.file.fileName}:${importDocument.file.fileId}`,
                dataSource: {
                    name: 'ExcelUserActivityDataSource',
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
