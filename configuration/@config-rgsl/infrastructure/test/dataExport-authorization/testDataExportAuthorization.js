const glob = require('glob');
const path = require('path');
const { assert } = require('chai');
const dsPaths = glob.sync(`${__dirname}/../../../../*/*/dataExport/*/configuration.json`);

describe('Configuration', function () {

    describe('DataExport Authorization', function () {

        for (const dsPath of dsPaths) {

            const dsName = path.basename(path.dirname(dsPath));

            it(dsName, function () {

                const configuration = require(dsPath);
                assert.isTrue(configuration.forceAuthorization, 'The forceAuthorization flag must be set');
            });
        }
    });
});
