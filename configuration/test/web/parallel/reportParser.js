// eslint-disable-next-line import/no-unresolved
const reportJson = require('../../../../ui-test-report/UI-test-report-merged.json');

console.log('UI Testing Report created successfully at: ./ui-test-report/UI-test-report-merged.json');

if ((reportJson.stats.failures > 0) || (reportJson.stats.skipped > 0)) {
    console.log('There are failures! Number of failures: ' + reportJson.stats.failures);
    console.log('There are skipped tests! Number of skipped tests: ' + reportJson.stats.skipped);
    process.exit(1);
} else {
    console.log('There are no failures!');
    process.exit(0);
}
