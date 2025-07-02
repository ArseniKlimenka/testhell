const indexer = require('@adinsure/config-utils/dist/indexer');
const { getEnvironmentConfiguration } = require('@adinsure-tools/test-framework/dist/src/utils/get-environment-configuration');
const validateTranslationPrefixes = require('./subtests/validate-translation-prefixes');
process.env.TEST_CONFIG = './test-validate-setup.json';
process.env.TEST_ENV_CONFIG = JSON.stringify(getEnvironmentConfiguration('local'));

describe('Configuration tests', function () {

    before(async function () {
        this.timeout(25000);
        await indexer.indexConfiguration('./', 'local');
    });

    describe('Validation tests', function () {
        require('@adinsure-tools/test-runner/dist/testing/test-validate');
    });

    validateTranslationPrefixes();
});