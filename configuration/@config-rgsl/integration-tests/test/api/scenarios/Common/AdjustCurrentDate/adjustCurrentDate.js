const commonSql = require('@adinsure-tools/common-sql');

async function adjustCurrentDate(step, context, stepContext) {

    const config = JSON.parse(process.env.TEST_ENV_CONFIG);

    const testingEnvironment = config.testingProperties.databaseTestingEnvironments[config.databaseProvider];
    testingEnvironment.trustServerCertificate = true; // TODO: remove this line after LJADIRDSUP-17823 will be fixed
    const database = await commonSql.createDatabase(config.databaseProvider, testingEnvironment);

    const parameters = {
        currentDate: context.currentDate,
    };

    const sqlSetValue = `
    merge BFX.CT_SETTING with(HOLDLOCK) as t
    using (values (10000, 'CurrentDate', @currentDate, 'ACC')) as s (setting_id, description, string_value, scope)
        on t.SETTING_ID = s.setting_id
    when matched then
        update
        set string_value = s.string_value
    when not matched then
        insert ( setting_id, description, string_value, scope )
        values ( s.setting_id, s.description, s.string_value, s.scope )
    ;`;
    const sqlDelete = 'delete from BFX.CT_SETTING where SETTING_ID = 10000';

    const sql = context.currentDate ? sqlSetValue : sqlDelete;
    const result = await database.execute(sql, parameters);
    console.log('SQL UPDATE RESULT: ' + JSON.stringify(result));
}

module.exports = {
    adjustCurrentDate,
};
