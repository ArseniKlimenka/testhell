'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(importDocument) {

    const ret = {
        importSources: [
            {
                sourceId: `CollectiveLifeInsurancePolicyWithOutTarificationImportDataSource:${this.businessContext.documentNumber}`,
                dataSource: {
                    name: `CollectiveLifeInsurancePolicyWithOutTarificationImportDataSource`,
                    input: {
                        data: {
                            fileId: importDocument.file.fileId
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
