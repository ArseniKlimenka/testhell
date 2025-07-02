const commonSql = require('@adinsure-tools/common-sql');

async function execute(step, context, stepContext) {

    const config = JSON.parse(process.env.TEST_ENV_CONFIG);

    const testingEnvironment = config.testingProperties.databaseTestingEnvironments[config.databaseProvider];
    testingEnvironment.trustServerCertificate = true; // TODO: remove this line after LJADIRDSUP-17823 will be fixed
    const database = await commonSql.createDatabase(config.databaseProvider, testingEnvironment);

    await database.execute('delete from acc_impl.RSD_JOB_LOG where ETL_EXECUTION_STATUS_ID != \'00000000-0000-0000-0000-000000000000\'');
    await database.execute('delete from acc_impl.RSD_JOB_PP_DATA where RSD_JOB_PP_DATA_ID != 0');
}

module.exports = {
    execute,
};
