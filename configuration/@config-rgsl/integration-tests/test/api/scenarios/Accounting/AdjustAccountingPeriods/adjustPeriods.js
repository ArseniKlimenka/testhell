const commonSql = require('@adinsure-tools/common-sql');

async function adjustPeriods(step, context, stepContext) {

    const config = JSON.parse(process.env.TEST_ENV_CONFIG);

    const testingEnvironment = config.testingProperties.databaseTestingEnvironments[config.databaseProvider];
    testingEnvironment.trustServerCertificate = true; // TODO: remove this line after LJADIRDSUP-17823 will be fixed
    const database = await commonSql.createDatabase(config.databaseProvider, testingEnvironment);

    if (!context.firstOpenPeriod) {
        throw new Error('firstOpenPeriod context parameter must be specified!');
    }

    const parameters = {
        firstOpenPeriod: context.firstOpenPeriod,
    };
    const result = await database.execute('update acc_impl.PERIOD set PERIOD_STATUS_ID = case when END_DATE >= @firstOpenPeriod then 1 else 3 end', parameters);
    console.log('SQL UPDATE RESULT: ' + JSON.stringify(result));
}

module.exports = {
    adjustPeriods,
};
