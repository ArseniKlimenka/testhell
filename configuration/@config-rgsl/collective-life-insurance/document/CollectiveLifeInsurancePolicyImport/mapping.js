'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(importDocument) {

    const ret = {
        importSources: [
            {
                sourceId: `CollectiveLifeInsurancePolicyImportDataSource:${this.businessContext.documentNumber}`,
                dataSource: {
                    name: `CollectiveLifeInsurancePolicyImportDataSource`,
                    input: {
                        data: {
                            fileId: importDocument.file.fileId,
                            productCode: importDocument.productCode
                        }
                    }
                }
            }
        ],
        attributes: {
            fileDate: dateTimeUtils.dateNow(),
            userId: this.applicationContext.originatingUser.id,
            userDisplayName: this.applicationContext.originatingUser.displayName,
            username: this.applicationContext.originatingUser.username
        }
    };

    return ret;
};
