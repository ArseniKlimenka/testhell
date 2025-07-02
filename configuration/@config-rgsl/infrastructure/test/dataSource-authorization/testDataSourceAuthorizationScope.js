const glob = require('glob');
const path = require('path');
const { assert } = require('chai');
const dsPaths = glob.sync(`${__dirname}/../../../../*/*/dataSource/*/configuration.json`);

describe('Configuration', function () {

    describe('DataSource Authorization', function () {

        for (const dsPath of dsPaths) {

            const dsName = path.basename(path.dirname(dsPath));

            it(dsName, function () {

                const configuration = require(dsPath);
                assert.includeMembers(configuration.authorizationScopes, ['adinsure'], 'Authorization scope adinsure must be set');
            });
        }
    });
});
