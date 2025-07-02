const { defineConfig } = require('cypress');
const baseConfig = require('@adinsure-tools/web-test-framework/cypress-base-ci.config.js');
const baseConfigEnv = baseConfig.env;
const baseConfigE2e = baseConfig.e2e;
const _ = require('lodash.merge');

const testLocationVar = './configuration/**/**/test/web/';
baseConfigE2e.specPattern = testLocationVar + '**/**/*.cy.{js,jsx,ts,tsx}';
baseConfigE2e.excludeSpecPattern = [
    '**/*.spec-lib.js',
    '**/*.json',
    '**/libs/**/*',
    '**/ui-test-report/**/*'
];

baseConfigEnv.cypressLocation = './web-test-framework/';
baseConfigEnv.envJSON = 'environment.ci.json';
baseConfigEnv.repo = 'config';
baseConfigEnv.keycloak = false;

module.exports = defineConfig({
    projectId: 'v76w9p',
    fixturesFolder: baseConfig.fixturesFolder,
    screenshotsFolder: baseConfig.screenshotsFolder,
    videosFolder: baseConfig.videosFolder,
    video: baseConfig.video,
    videoCompression: baseConfig.videoCompression,
    watchForFileChanges: baseConfig.watchForFileChanges,
    reporter: baseConfig.reporter,
    reporterOptions: {
        reporterEnabled: baseConfig.reporterOptions.reporterEnabled,
        useStdError: baseConfig.reporterOptions.useStdError,
        overwrite: baseConfig.reporterOptions.overwrite,
        reportDir: baseConfig.reporterOptions.reportDir,
        reportFilename: baseConfig.reporterOptions.reportFilename,
        reportPageTitle: baseConfig.reporterOptions.reportPageTitle,
        reportTitle: baseConfig.reporterOptions.reportTitle,
        code: baseConfig.reporterOptions.code,
        charts: baseConfig.reporterOptions.charts,
        inline: baseConfig.reporterOptions.inline,
        html: baseConfig.reporterOptions.html,
        json: baseConfig.reporterOptions.json,
        quiet: baseConfig.reporterOptions.quiet,
        showHooks: baseConfig.reporterOptions.showHooks,
        saveJson: baseConfig.reporterOptions.saveJson,
    },
    env: _(baseConfigEnv),
    chromeWebSecurity: baseConfig.chromeWebSecurity,
    viewportWidth: baseConfig.viewportWidth,
    viewportHeight: baseConfig.viewportHeight,
    includeShadowDom: baseConfig.includeShadowDom,
    e2e: _(baseConfigE2e),
    defaultCommandTimeout: 70000,
    experimentalMemoryManagement: baseConfig.experimentalMemoryManagement,
    numTestsKeptInMemory: baseConfig.numTestsKeptInMemory
});
